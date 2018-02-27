// Core function
import validate from './validators/core';
// Vaidators functions
import Email from './validators/email';
import Min from './validators/min';
import Max from './validators/max';

// Exporting
export default validate;
export {
  Email,
  Min,
  Max
};
