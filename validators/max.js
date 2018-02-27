import t from 'tcomb-form';

export default length => {
  const validator = t.refinement(t.String, v => String(v).length <= length);
  validator.getValidationErrorMessage = () => `Maximum length is ${length}`;
  return validator;
};
