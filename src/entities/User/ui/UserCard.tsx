import { FC } from 'react';

import { User } from '@/entities/User/model/types';
import { AvaImage } from '@/entities/User/ui/AvaImage';
import { UserNameBlock } from '@/entities/User/ui/UserNameBlock';

interface UserCardProps {
  user: User | null;
  onClick?: () => void;
  className?: string;
}

export const UserCard: FC<UserCardProps> = ({ user, className = '', onClick }) => {
  if (!user) return null;
  const { avaUrl, firstName, secondName, telegramLink } = user;

  return (
    <div className="flex items-center gap-3 mb-4 px-2" onClick={onClick}>
      <AvaImage avaUrl={avaUrl} size={40} />
      <UserNameBlock
        firstName={firstName}
        secondName={secondName}
        telegramLink={telegramLink}
        className={className}
      />
    </div>
  );
};
