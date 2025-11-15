'use client';

import { ButtonHTMLAttributes, FC } from 'react';

import { Button, ButtonType } from '@/shared/ui/Buttons/index';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClickAction: () => void;
  title: string;
}

export const SimpleButton: FC<ButtonProps> = ({ handleClickAction, title, className }) => {
  return (
    <Button variant={ButtonType.SIMPLE} onClick={handleClickAction} className={className}>
      {title}
    </Button>
  );
};
