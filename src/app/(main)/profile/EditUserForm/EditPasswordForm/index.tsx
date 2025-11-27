import { useFormik } from 'formik';
import { FC, useState } from 'react';

import { changePasswordValidationSchema } from '@/app/(main)/profile/EditUserForm/EditPasswordForm/lib/changePasswordValidationSchema';
import { updatePassword } from '@/entities/User/api/updatePassword';
import { updateUser } from '@/entities/User/api/updateUser';
import { UpdatePasswordPayload, User } from '@/entities/User/model/types';
import { Button, ButtonType } from '@/shared/ui/Buttons';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import InputFieldWithValidation from '@/shared/ui/InputField';
import { LabelCustom } from '@/shared/ui/LabelCustom';
import { PasswordEyeButton } from '@/shared/ui/PasswordEyeButton';

export type EditFormValues = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

interface EditFormProps {
  closeModal: () => void;
}

const createPayloadFromValues = (values: EditFormValues): UpdatePasswordPayload => {
  const { password, newPassword } = values;

  return {
    oldPassword: password,
    newPassword: newPassword,
  };
};

export const EditPasswordForm: FC<EditFormProps> = ({ closeModal }) => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const formik = useFormik<EditFormValues>({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values) => {
      setError(null);

      try {
        const payload = createPayloadFromValues(values);
        await updatePassword(payload);
        closeModal();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(message);
      }
    },
  });

  const toggleShowPassword = () => setShowPassword((p) => !p);
  const toggleShowNewPassword = () => setShowNewPassword((p) => !p);
  const toggleShowConfirm = () => setShowConfirm((p) => !p);

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col space-y-4" noValidate>
      <ErrorMessage message={error} />

      <p className="text-3xl font-bold">Change password</p>

      <LabelCustom title={'Current password'} />
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

      <LabelCustom title={'Change password'} />
      <div className="relative">
        <InputFieldWithValidation
          name="newPassword"
          type={showNewPassword ? 'text' : 'password'}
          placeholder="New password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched.newPassword}
          hasError={!!formik.errors.newPassword}
          errorMessage={formik.errors.newPassword}
        />
        <PasswordEyeButton show={showNewPassword} onToggle={toggleShowNewPassword} />
      </div>

      <LabelCustom title={'Confirm password'} />
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

      <Button
        variant={ButtonType.PRIMARY}
        type="submit"
        disabled={!formik.isValid || !formik.dirty}
        className="mt-4"
      >
        Save
      </Button>
    </form>
  );
};
