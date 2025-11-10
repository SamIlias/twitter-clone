export function maskPhone(value: string): string {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length === 0) {
    return '+375(';
  }

  let numbers = cleaned;
  if (!numbers.startsWith('375')) {
    numbers = '375' + numbers;
  }

  numbers = numbers.slice(0, 12);

  const country = '+375';
  const code = numbers.slice(3, 5);
  const rest = numbers.slice(5);

  let masked = `${country}(`;

  masked += code;

  if (rest.length > 0) {
    masked += ')-' + rest.slice(0, 3);
  }

  if (rest.length > 3) {
    masked += '-' + rest.slice(3, 5);
  }

  if (rest.length > 5) {
    masked += '-' + rest.slice(5, 7);
  }

  return masked;
}
