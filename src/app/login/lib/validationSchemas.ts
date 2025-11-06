import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid mail format')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid mail format'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Password must contain a minimum of 8 characters, 1 lower case letter, 1 upper case letter',
    ),
});
