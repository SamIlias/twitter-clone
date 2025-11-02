'use client';
import { FC, ReactNode } from 'react';

import s from './button.module.scss';

type ButtonType = 'primary' | 'secondary' | 'simple';

interface ButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  variant: ButtonType;
}

export const Button: FC<ButtonProps> = ({ onClick, children, variant }) => {
  return (
    <button className={`${s.button} ${s[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};
