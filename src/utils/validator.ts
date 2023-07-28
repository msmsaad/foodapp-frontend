import * as Yup from 'yup';

export const requiredString = 'You must enter a value for this field';
export const emailValidator = Yup.string()
  .email('Invalid email address')
  .required(requiredString);

export const passwordValidator = Yup.string().required(requiredString);
export const createPasswordValidator = Yup.string()
  .required(requiredString)
  .min(8, 'Password must be at least 8 characters long')
  .matches(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric');

export const passwordConfirmation = Yup.string().oneOf(
  [Yup.ref('password'), null],
  'Passwords must match'
);
