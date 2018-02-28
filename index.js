// Core function
import validate, { tValidate } from './validators/core';
// Vaidators functions
import Email from './validators/email';
import Min from './validators/min';
import Max from './validators/max';

// Exporting
export default validate;
export {
  tValidate,
  Email,
  Min,
  Max
};
