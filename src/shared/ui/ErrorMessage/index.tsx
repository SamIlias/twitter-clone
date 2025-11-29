import { FC } from 'react';

interface ErrorMessageProps {
  message: string | null | undefined;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return <div className="mb-2 p-3 text-red-700">{message}</div>;
};

interface CustomErrorMessageProps {
  error: unknown;
}

export const CustomErrorMessage: FC<CustomErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  let message = 'There is an unknown error occured';

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  return <div className="mb-2 p-3 text-red-700">{message}</div>;
};
