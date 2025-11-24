import { FC } from 'react';

interface ErrorMessageProps {
  message: string | null | undefined;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return <div className="mb-2 p-3 text-red-700">{message}</div>;
};
