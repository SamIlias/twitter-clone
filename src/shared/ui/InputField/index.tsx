import { ChangeEvent, FC, FocusEventHandler } from 'react';

import { cn } from '@/shared/lib/utils';

interface InputFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  touched?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

const InputFieldWithValidation: FC<InputFieldProps> = ({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  touched,
  hasError,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cn(
          'border rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
          touched && hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-700',
        )}
      />
      {touched && hasError && errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFieldWithValidation;
