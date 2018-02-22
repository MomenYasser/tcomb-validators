import t from 'tcomb-form';
import map from 'lodash/map';
import moment from 'moment';

// Validation Engine
const validate = validators => {
  let message = 'This field is required';
  const validator = t.refinement(t.String, v => {
    if (Object.prototype.toString.call(v) === '[object Object]') {
      if (!validators) {
        const errors = [];
        map(v, (key, value) => {
          if (!t.validate(value, t.String)) {
            errors.push(value);
          }
        });
        if (errors.length > 0) {
          return false;
        }
        return true;
      }
      // @TODO: Use reusable solution to next block of code ( look to next @TODO )
      if (validators && validators.length <= 1) {
        if (!t.validate(v, validators[0]).isValid()) {
          message = t.validate(v, validators[0]).firstError().message;
          return false;
        }
      } else if (!t.validate(v, t.intersection(validators)).isValid()) {
        message = t.validate(v, t.intersection(validators)).firstError().message;
        return false;
      }
    } else if (!String(v)) {
      return false;
    } else if (validators) {
      // @TODO: Use reusable solution to next block of code ( look to next @TODO )
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
// const validate = validators => {
//   let message = 'This field is required';
//   const validator = t.refinement(t.String, v => {
//     if (Object.prototype.toString.call(v) === '[object Object]') {
//       if (!validators) {
//         const errors = [];
//         map(v, (key, value) => {
//           if (!t.validate(value, t.String)) {
//             errors.push(value);
//           }
//         });
//         if (errors.length > 0) {
//           return false;
//         }
//         return true;
//       }
//       // @TODO: Use reusable solution to next block of code ( look to next @TODO )
//       if (validators && validators.length <= 1) {
//         if (!t.validate(v, validators[0]).isValid()) {
//           message = t.validate(v, validators[0]).firstError().message;
//           return false;
//         }
//       } else if (!t.validate(v, t.intersection(validators)).isValid()) {
//         message = t.validate(v, t.intersection(validators)).firstError().message;
//         return false;
//       }
//     } else if (!String(v)) {
//       return false;
//     } else if (validators) {
//       // @TODO: Use reusable solution to next block of code ( look to next @TODO )
//       if (validators.length <= 1) {
//         if (!t.validate(v, validators[0]).isValid()) {
//           message = t.validate(v, validators[0]).firstError().message;
//           return false;
//         }
//       } else if (!t.validate(v, t.intersection(validators)).isValid()) {
//         message = t.validate(v, t.intersection(validators)).firstError().message;
//         return false;
//       }
//     }
//     message = 'This field is required';
//     return true;
//   });
//   validator.getValidationErrorMessage = () => message;
//   return validator;
// };

export default validate;


// Validators
export const Min = length => {
  const validator = t.refinement(t.String, v => String(v).length >= length);
  validator.getValidationErrorMessage = () => `Minimum length is ${length}`;
  return validator;
};

export const Max = length => {
  const validator = t.refinement(t.String, v => String(v).length <= length);
  validator.getValidationErrorMessage = () => `Maximum length is ${length}`;
  return validator;
};

export const Email = () => {
  const validator = t.refinement(t.String, v => Boolean(v.match('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')));
  validator.getValidationErrorMessage = () => 'Please enter valid email';
  return validator;
};

export const File = () => {
  const Input = t.irreducible('File', x => {
    return x instanceof Input;
  });
};

export const ShareWith = () => {
  const validator = t.refinement(
    t.struct({ type: t.String, ids: t.list(t.String) }), v => {
      if (v.type === 'school') {
        return true;
      }

      if (v.ids.length <= 0) {
        return false;
      }

      return true;
    }
  );
  validator.getValidationErrorMessage = () => 'Please add items';
  return validator;
};

export const TimeRange = () => {
  const validator = t.refinement(t.Any, v => {
    if (moment(v.from).diff(v.to) >= 0 && (v.from !== undefined && v.to !== undefined)) {
      return false;
    }
    return true;
  });
  validator.getValidationErrorMessage = () => 'To cannot be less than from';
  return validator;
};

export const PreventFuture = () => {
  const validator = t.refinement(t.Any, v => {
    if (moment(moment().format()).diff(moment(v).format()) < 0) {
      return false;
    }
    return true;
  });
  validator.getValidationErrorMessage = () => 'Cannot choose a future date';
  return validator;
};
