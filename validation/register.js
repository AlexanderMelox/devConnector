const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  // Init a errors object
  let errors = {};
  
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Checks if the name is between 2 and 30 characters
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  // Checks if the name field is empty
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  // Checks if the email field is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  // Checks if the email field is a valid email
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Checks if the password field is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  // Checks if the password is between 6 to 30 characters
  if (!Validator.isLength(data.password, { min: 6, max: 30})) {
    errors.password = 'Password must be atleast 6 characters';
  }

  // Checks if the confirm password is empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  // Checks if the passwords match
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  // Returns an object with the errors object and an isValid boolean
  return {
    errors,
    isValid: isEmpty(errors)
  }
}