export const months = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export function isValidMonth(month: string): month is keyof typeof months {
  return month in months;
}

export const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

export function days(month: string, year: string) {
  if (!month || !isValidMonth(month)) return Array.from({ length: 31 }, (_, i) => i + 1);

  const yearNum = year ? +year : new Date().getFullYear();
  const daysInMonth = new Date(yearNum, months[month] + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}

export function buildISOBirthDate(values: {
  year: string;
  month: keyof typeof months;
  day: string;
}): string | null {
  if (!values.year || !values.month || !values.day) {
    return null;
  }

  const month = String(months[values.month] + 1).padStart(2, '0');
  const day = values.day.padStart(2, '0');

  return `${values.year}-${month}-${day}`;
}

export const formatDate = (date: string) => {
  const d = new Date(date);

  return d
    .toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(/,/g, '');
};
