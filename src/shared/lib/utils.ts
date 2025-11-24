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

export function splitFullName(fullName: string): { firstName: string; secondName: string } {
  if (!fullName) return { firstName: '', secondName: '' };

  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] ?? '';
  const secondName = parts.slice(1).join(' ') ?? ''; // все оставшиеся части в secondName
  return { firstName, secondName };
}
