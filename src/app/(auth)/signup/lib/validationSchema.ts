import * as Yup from 'yup';

import { isAdult } from '@/shared/lib/utils';

export const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must be less than 20 characters'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(
      /^\+375\((29|33|44)\)-\d{3}-\d{2}-\d{2}$/,
      'Invalid phone format. Use +375(XX)-XXX-XX-XX with codes 29, 33, or 44',
    ),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid mail format')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid mail format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters')
    .max(20, 'Maximum 20 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/,
      'Password must contain upper, lower, number, and special character',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  year: Yup.string()
    .required('Date of birth is required')
    .test('is-adult', 'You must be at least 16 years old', function () {
      const { day, month, year } = this.parent;
      if (!day || !month || !year) {
        return true;
      }
      return isAdult(day, month, year);
    }),
  month: Yup.string().required('Date of birth is required'),
  day: Yup.string().required('Date of birth is required'),
});
