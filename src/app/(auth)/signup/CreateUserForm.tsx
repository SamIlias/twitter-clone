'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useMemo, useState } from 'react';

import { register } from '@/api/register';
import { createPayloadFromValues } from '@/app/(auth)/signup/lib/formHandlers';
import { validationSchema } from '@/app/(auth)/signup/lib/validationSchema';
import { ROUTES } from '@/shared/constants';
import { days, isValidMonth, months, years } from '@/shared/lib/date';
import { maskPhone } from '@/shared/lib/phoneMask';
import { Button, ButtonType } from '@/shared/ui/Buttons';
import { CustomLink } from '@/shared/ui/CustomLink';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import InputFieldWithValidation from '@/shared/ui/InputField';
import { PasswordEyeButton } from '@/shared/ui/PasswordEyeButton';
import { SelectorWithValidation } from '@/shared/ui/Selector';

export type FormValues = {
  name: string;
  phone: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
};

export default function CreateUserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      month: '',
      day: '',
      year: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const payload = await createPayloadFromValues(values);
      const data = await register(payload, setError);
      setIsSubmitting(false);

      if (data) {
        //todo change route to HOME
        router.push(ROUTES.PROFILE);
      }
    },
  });

  const { values, setFieldValue } = formik;

  useMemo(() => {
    const currentDay = Number(values.day);
    const currentMonth = values.month;
    const currentYear = Number(values.year);

    if (!currentMonth || !isValidMonth(currentMonth)) return;

    const maxDay = new Date(
      currentYear ? currentYear : new Date().getFullYear(),
      months[currentMonth] + 1,
      0,
    ).getDate();

    if (currentDay > maxDay) {
      setFieldValue('day', maxDay);
    }
  }, [values.month, values.year, values.day, setFieldValue]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const masked = maskPhone(input);
    formik.setFieldValue('phone', masked);
  };

  const toggleShowConfirm = () => setShowConfirm((p) => !p);
  const toggleShowPassword = () => setShowPassword((p) => !p);

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col space-y-3" noValidate>
      <ErrorMessage message={error} />
      <InputFieldWithValidation
        name="name"
        placeholder="Full name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.name}
        hasError={!!formik.errors.name}
        errorMessage={formik.errors.name}
      />

      <InputFieldWithValidation
        name="phone"
        placeholder={'+375(XX)-XXX-XX-XX'}
        value={formik.values.phone}
        onChange={handlePhoneChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.phone}
        hasError={!!formik.errors.phone}
        errorMessage={formik.errors.phone}
      />

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

      <div className="relative">
        <InputFieldWithValidation
          name="confirmPassword"
          type={showConfirm ? 'text' : 'password'}
          placeholder="Confirm password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched.confirmPassword}
          hasError={!!formik.errors.confirmPassword}
          errorMessage={formik.errors.confirmPassword}
        />
        <PasswordEyeButton show={showConfirm} onToggle={toggleShowConfirm} />
      </div>

      <div className="flex">
        <CustomLink href={ROUTES.LOGIN} name={'Use Google'} />
      </div>

      <p className="text text-bold">Date of birth</p>

      <div className="flex space-x-2">
        <SelectorWithValidation
          name={'month'}
          options={Object.keys(months)}
          value={formik.values.month}
          onChange={formik.setFieldValue}
          onBlur={() => formik.setFieldTouched('month', true)}
          touched={formik.touched.month}
          hasError={!!formik.errors.month}
          placeholder={'Month'}
        />

        <SelectorWithValidation
          name={'day'}
          options={days(formik.values.month, formik.values.year).map(String)}
          value={formik.values.day}
          onChange={formik.setFieldValue}
          onBlur={() => formik.setFieldTouched('day', true)}
          touched={formik.touched.day}
          hasError={!!formik.errors.day}
          placeholder={'Day'}
        />

        <SelectorWithValidation
          name={'year'}
          options={years.map(String)}
          value={formik.values.year}
          onChange={formik.setFieldValue}
          onBlur={() => formik.setFieldTouched('year', true)}
          touched={formik.touched.year}
          hasError={!!formik.errors.year}
          placeholder={'Year'}
        />
      </div>

      {formik.touched.year &&
        formik.touched.month &&
        formik.touched.day &&
        (formik.errors.year || formik.errors.month || formik.errors.day) && (
          <p className="text-red-500 text-sm">
            {formik.errors.year || formik.errors.month || formik.errors.day}
          </p>
        )}

      <Button
        variant={ButtonType.PRIMARY}
        type="submit"
        disabled={isSubmitting || !formik.isValid || !formik.dirty}
        className="mt-4"
      >
        {isSubmitting ? 'Creating...' : 'Create account'}
      </Button>
    </form>
  );
}
