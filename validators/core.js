import t from 'tcomb-form';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';

// Stand alone version
export default (v, validators) => {
  // Validate The inputs
  if (isFunction(validators)) {
    // If function ( Single validator )
    return t.validate(v, validators).isValid();
  } else if (isArray(validators)) {
    // Id array of validators
    if (validators.length <= 1) {
      return t.validate(v, validators[0]).isValid();
    } else {
      return t.validate(v, t.intersection(validators)).isValid();
    }
  }
};

// Tcomb Version
export const tValidate = () => {
  let message = 'This field is required';
  const validator = t.refinement(t.String, v => {
    if (validators) {
      if (validators.length <= 1) {
        if (!t.validate(v, validators[0]).isValid()) {
          message = t.validate(v, validators[0]).firstError().message;
          return false;
        }
      } else if (!t.validate(v, t.intersection(validators)).isValid()) {
        message = t.validate(v, t.intersection(validators)).firstError().message;
        return false;
      }
    }
    message = 'This field is required';
    return true;
  });
  validator.getValidationErrorMessage = () => message;
  return validator;
};
