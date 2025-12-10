'use client';

import { useFormik } from 'formik';
import { FC, useCallback, useState } from 'react';

import { uploadImage } from '@/api/uploadImage';
import { createPayloadFromValues } from '@/app/(main)/profile/EditUserForm/lib/editFormHandlers';
import { editUserValidationSchema } from '@/app/(main)/profile/EditUserForm/lib/editUserValidationSchema';
import { updateUser } from '@/entities/User/api/updateUser';
import { User } from '@/entities/User/model/types';
import { defaultAvaUrl, defaultBannerUrl, GENDER } from '@/shared/constants';
import { Button, ButtonType } from '@/shared/ui/Buttons';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { SelectSingleImage } from '@/shared/ui/ImageSelector/SelectSingleImageBlock/SelectSingleImage';
import InputFieldWithValidation from '@/shared/ui/InputField';
import { LabelCustom } from '@/shared/ui/LabelCustom';
import { SelectorWithValidation } from '@/shared/ui/Selector';

export type EditFormValues = {
  name: string;
  avaUrl: string | File | null;
  bannerUrl: string | File | null;
  telegramLink: string;
  status: string;
  gender: GENDER;
};

interface EditFormProps {
  user: User;
  setUser: (user: User) => void;
  closeModal: () => void;
  handleEditPasswordClick: () => void;
}

export const EditUserForm: FC<EditFormProps> = ({
  user,
  setUser,
  closeModal,
  handleEditPasswordClick,
}) => {
  const [error, setError] = useState<string | null>(null);

  const onError = (e: string) => {
    setError(e);
  };

  const formik = useFormik<EditFormValues>({
    initialValues: {
      name: `${user.firstName} ${user.secondName}`,
      avaUrl: user.avaUrl || defaultAvaUrl,
      bannerUrl: user.bannerUrl || defaultBannerUrl,
      status: user.status || '',
      telegramLink: user.telegramLink || '',
      gender: user.gender ?? GENDER.MALE,
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: editUserValidationSchema,
    onSubmit: async (values) => {
      setError(null);

      try {
        if (values.avaUrl instanceof File) {
          const avaUrlRes = await uploadImage(values.avaUrl);
          values.avaUrl = avaUrlRes?.url || values.avaUrl;
        }

        if (values.bannerUrl instanceof File) {
          const bannerUrlRes = await uploadImage(values.bannerUrl);
          values.bannerUrl = bannerUrlRes?.url || values.bannerUrl;
        }

        const payload = await createPayloadFromValues(values);
        const updatedUser = await updateUser(payload);
        if (updatedUser) {
          setUser(updatedUser);
        }
        closeModal();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(message);
      }
    },
  });

  const handleAvaSelect = useCallback(
    (file: File | string | null) => formik.setFieldValue('avaUrl', file),
    [formik],
  );

  const handleBannerSelect = useCallback(
    (file: File | string | null) => formik.setFieldValue('bannerUrl', file),
    [formik],
  );

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col space-y-4" noValidate>
      <ErrorMessage message={error} />

      <p className="text-3xl font-bold">Change info</p>

      <div className="w-3/5">
        <LabelCustom title={'Name'} />
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
      </div>

      <div onClick={handleEditPasswordClick} className="text-blue-400 cursor-pointer">
        {'Would you like to change your password?'}
      </div>

      <div className="flex md:gap-8 justify-center">
        <SelectSingleImage
          title="Avatar:"
          initialImage={formik.values.avaUrl}
          onError={onError}
          onChange={handleAvaSelect}
        />

        <SelectSingleImage
          title="Banner:"
          initialImage={formik.values.bannerUrl}
          onError={onError}
          onChange={handleBannerSelect}
        />
      </div>

      <p className="text-2xl font-bold">Addition info</p>

      <div>
        <LabelCustom title={'Telegram link'} />
        <InputFieldWithValidation
          name="telegramLink"
          placeholder="telegram link"
          value={formik.values.telegramLink}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched.status}
          hasError={!!formik.errors.status}
          errorMessage={formik.errors.status}
        />
      </div>

      <div>
        <LabelCustom title={'BIO'} />
        <InputFieldWithValidation
          name="status"
          placeholder="Status"
          value={formik.values.status}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        <LabelCustom title={'Gender'} />
        <SelectorWithValidation
          name="gender"
          options={['male', 'female']}
          value={formik.values.gender}
          onChange={formik.setFieldValue}
          placeholder="Gender"
        />
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
