import * as Yup from 'yup';

export const editUserValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must be less than 20 characters'),
});
