'use client';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

type ButtonType = 'primary' | 'secondary' | 'simple';

// interface ButtonProps {
//   onClick?: () => void;
//   children?: ReactNode;
//   type?: 'submit' | 'reset' | 'button' | undefined;
//   disabled?: boolean;
//   variant: ButtonType;
// }

// export const Button: FC<ButtonProps> = ({ onClick, children, variant, type, disabled }) => {
//   const baseStyles =
//     'w-full h-[50px] flex justify-center items-center font-bold border border-[color:var(--color-border)] cursor-pointer transition-colors duration-200';
//
//   const variantStyles = {
//     primary:
//       'bg-[color:var(--color-button-primary)] hover:bg-[color:var(--color-button-primary-hover)] text-[color:var(--color-text-primary)] rounded-[50px] disabled:bg-[color:var(--color-button-disabled)] disabled:text-[color:var(--color-text-secondary)] disabled:cursor-not-allowed disabled:opacity-60',
//
//     secondary:
//       'bg-[color:var(--color-button-secondary)] hover:bg-[color:var(--color-button-secondary-hover)] text-[color:var(--color-text-primary)] rounded-[50px] disabled:bg-[color:var(--color-button-disabled)] disabled:text-[color:var(--color-text-secondary)] disabled:cursor-not-allowed disabled:opacity-60',
//
//     simple:
//       'bg-[color:var(--color-button-simple)] hover:bg-[color:var(--color-button-simple-hover)] text-[color:var(--color-text-primary)] rounded-[50px] disabled:bg-[color:var(--color-button-disabled)] disabled:text-[color:var(--color-text-secondary)] disabled:cursor-not-allowed disabled:opacity-60',
//   };
//   return (
//     <button
//       type={type}
//       disabled={disabled}
//       className={`${baseStyles} ${variantStyles[variant]}`}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className,
  ...props
}) => {
  const baseStyles =
    'w-full h-[50px] flex justify-center items-center font-bold border border-[color:var(--color-border)] cursor-pointer transition-colors duration-200 rounded-[50px]';

  const variantStyles: Record<ButtonType, string> = {
    primary:
      'bg-[color:var(--color-button-primary)] hover:bg-[color:var(--color-button-primary-hover)] text-[color:var(--color-text-primary)] disabled:bg-[color:var(--color-button-disabled)] disabled:text-[color:var(--color-text-secondary)] disabled:cursor-not-allowed disabled:opacity-60',

    secondary:
      'bg-[color:var(--color-button-secondary)] hover:bg-[color:var(--color-button-secondary-hover)] text-[color:var(--color-text-primary)] disabled:bg-[color:var(--color-button-disabled)] disabled:text-[color:var(--color-text-secondary)] disabled:cursor-not-allowed disabled:opacity-60',

    simple:
      'bg-[color:var(--color-button-simple)] hover:bg-[color:var(--color-button-simple-hover)] text-[color:var(--color-text-primary)] disabled:bg-[color:var(--color-button-disabled)] disabled:text-[color:var(--color-text-secondary)] disabled:cursor-not-allowed disabled:opacity-60',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className ? className : '')}
      {...props}
    >
      {children}
    </button>
  );
};
