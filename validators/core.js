import t from 'tcomb-form';

export default validators => {
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
