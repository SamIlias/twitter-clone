import { FormValues } from '@/app/(auth)/signup/CreateUserForm';
import { RegisterPayload } from '@/entities/User/model/types';
import { buildISOBirthDate, isValidMonth } from '@/shared/lib/date';
import { splitFullName } from '@/shared/lib/utils';

export async function createPayloadFromValues(values: FormValues): Promise<RegisterPayload> {
  const { name, phone, email, password, day, month, year } = values;

  if (!isValidMonth(month)) {
    throw new Error('Invalid month');
  }

  const birthDate = buildISOBirthDate({ year, month, day });

  const { firstName, secondName } = splitFullName(name);

  return {
    firstName,
    secondName,
    phone,
    email: email.toLowerCase(),
    password,
    birthDate,
    telegramLink: '',
    status: '',
    avaUrl: '',
    bannerUrl: '',
  };
}
