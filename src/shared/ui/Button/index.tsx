'use client';
import { FC, ReactNode } from 'react';

type ButtonType = 'primary' | 'secondary' | 'simple';

interface ButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  variant: ButtonType;
}

export const Button: FC<ButtonProps> = ({ onClick, children, variant }) => {
  const baseStyles =
    'w-full h-[50px] flex justify-center items-center font-bold border border-[color:var(--color-border)] cursor-pointer transition-colors duration-200';

  const variantStyles = {
    primary:
      'bg-[color:var(--color-button-primary)] hover:bg-[color:var(--color-button-primary-hover)] text-[color:var(--color-text-primary)] rounded-[50px]',
    secondary:
      'bg-[color:var(--color-button-secondary)] hover:bg-[color:var(--color-button-secondary-hover)] text-[color:var(--color-text-primary)] rounded-[50px]',
    simple:
      'bg-[color:var(--color-button-simple)] hover:bg-[color:var(--color-button-simple-hover)] text-[color:var(--color-text-primary)] rounded-[50px]',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};
