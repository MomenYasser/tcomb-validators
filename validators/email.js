import t from 'tcomb-form';

export default () => {
  const validator = t.refinement(t.String, v => Boolean(v.match('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')));
  validator.getValidationErrorMessage = () => 'Please enter valid email';
  return validator;
};
