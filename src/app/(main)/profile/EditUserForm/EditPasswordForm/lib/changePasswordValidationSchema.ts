import * as Yup from 'yup';

export const changePasswordValidationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters')
    .max(20, 'Maximum 20 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/,
      'Password must contain upper, lower, number, and special character',
    ),
  newPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters')
    .max(20, 'Maximum 20 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/,
      'Password must contain upper, lower, number, and special character',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});
