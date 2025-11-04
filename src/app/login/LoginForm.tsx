'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid mail format').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Password must contain a minimum of 8 characters, 1 lower case letter, 1 upper case letter',
    ),
});

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    //todo change mock
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await new Promise((res) => setTimeout(res, 1000));
      console.log('Submitted:', values);
      setIsSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col space-y-4" noValidate>
      <div className="flex flex-col">
        <input
          type="text"
          name="email"
          placeholder="Phone number, email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={cn(
            'border rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
            formik.touched.email && formik.errors.email
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-700',
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={cn(
            'border rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
            formik.touched.password && formik.errors.password
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-700',
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
        )}
      </div>

      <Button
        variant={'primary'}
        type="submit"
        disabled={isSubmitting || !formik.isValid || !formik.dirty}
      >
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </Button>
    </form>
  );
}
