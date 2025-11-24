'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { loginUser } from '@/api/login';
import { validationSchema } from '@/app/(auth)/login/lib/validationSchema';
import { ROUTES } from '@/shared/constants';
import { Button, ButtonType } from '@/shared/ui/Buttons';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import InputFieldWithValidation from '@/shared/ui/InputField';
import { PasswordEyeButton } from '@/shared/ui/PasswordEyeButton';

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const toggleShowPassword = () => setShowPassword((p) => !p);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const data = await loginUser(values);
        if (data && data.message === 'ok') {
          router.push(ROUTES.PROFILE);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col space-y-4" noValidate>
      <ErrorMessage message={error} />
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

      <div className="relative">
        <InputFieldWithValidation
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched.password}
          hasError={!!formik.errors.password}
          errorMessage={formik.errors.password}
        />
        <PasswordEyeButton show={showPassword} onToggle={toggleShowPassword} />
      </div>

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
