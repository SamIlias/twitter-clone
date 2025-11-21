import { FC } from 'react';

import { cn } from '@/shared/lib/utils';

type UserNameBlockProps = {
  firstName: string;
  secondName: string;
  telegramLink: string;
  textSize?: string;
  className?: string;
};

export const UserNameBlock: FC<UserNameBlockProps> = ({
  firstName,
  secondName,
  telegramLink,
  className = '',
}) => {
  return (
    <div className={cn(className)}>
      <div className={`font-bold`}>
        {firstName} {secondName}
      </div>
      <div className={`text-[var(--color-text-placeholder)] text-[0.9em] self-center`}>
        {telegramLink}
      </div>
    </div>
  );
};
