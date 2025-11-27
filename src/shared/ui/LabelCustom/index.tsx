import { FC } from 'react';

import { cn } from '@/shared/lib/utils';

interface LabelProps {
  title: string;
  classname?: string;
}

export const LabelCustom: FC<LabelProps> = ({ title, classname = '' }) => {
  return <p className={cn(classname, 'text-[var(--color-text-placeholder)] mb-1.5')}>{title}</p>;
};
