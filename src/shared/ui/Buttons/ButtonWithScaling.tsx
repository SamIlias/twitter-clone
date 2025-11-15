import { FC, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

interface ButtonProps {
  handleClick: () => void;
  children: ReactNode;
  className?: string;
}

export const ButtonWithScaling: FC<ButtonProps> = ({ handleClick, children, className = '' }) => {
  return (
    <button
      onClick={handleClick}
      className={cn('cursor-pointer transition-transform hover:scale-110', className)}
    >
      {children}
    </button>
  );
};
