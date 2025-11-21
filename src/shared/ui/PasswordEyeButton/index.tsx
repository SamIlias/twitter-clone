import { FC } from 'react';

import { cn } from '@/shared/lib/utils';
import { HidePasswordIcon, ShowPasswordIcon } from '@/shared/ui/Icons';

interface PasswordEyeButtonProps {
  show: boolean;
  onToggle: () => void;
  className?: string;
}

export const PasswordEyeButton: FC<PasswordEyeButtonProps> = ({ show, onToggle, className }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'absolute right-3 top-3 text-sm text-gray-500 focus:outline-none focus:ring-0',
        className || '',
      )}
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      {show ? <HidePasswordIcon /> : <ShowPasswordIcon />}
    </button>
  );
};
