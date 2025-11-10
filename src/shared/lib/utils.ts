import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { isValidMonth, months } from '@/shared/lib/date';

export function cn(...inputs: string[]) {
  return twMerge(clsx(inputs));
}

export function isAdult(day: string, month: string, year: string): boolean {
  if (!day || !month || !year || !isValidMonth(month)) return false;
  const birthDate = new Date(+year, months[month], +day);
  const today = new Date();
  const age =
    today.getFullYear() -
    birthDate.getFullYear() -
    (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
  return age >= 16;
}
