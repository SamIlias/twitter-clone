'use client';

import { useFormik } from 'formik';
import { useState } from 'react';

import { validationSchema } from '@/app/login/lib/validationSchemas';
import { Button, ButtonType } from '@/shared/ui/Button';
import InputFieldWithValidation from '@/shared/ui/InputField';

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
      <InputFieldWithValidation
        name="email"
        placeholder="Email address"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.email}
        hasError={!!formik.errors.email}
        errorMessage={formik.errors.email}
      />

      <InputFieldWithValidation
        name="password"
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.password}
        hasError={!!formik.errors.password}
        errorMessage={formik.errors.password}
      />

      <Button
        variant={ButtonType.PRIMARY}
        type="submit"
        disabled={isSubmitting || !formik.isValid || !formik.dirty}
      >
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </Button>
    </form>
  );
}
