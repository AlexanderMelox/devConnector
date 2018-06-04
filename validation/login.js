const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  // Init errors object
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Checks if it is a valid email
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Checks if the password field is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  // Checks if the email field is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}