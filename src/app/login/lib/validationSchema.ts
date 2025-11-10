import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid mail format')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid mail format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters')
    .max(20, 'Maximum 15 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/,
      'Password must contain upper, lower, number, and special character',
    ),
});
