'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { UserCard } from '@/entities/User/ui/UserCard';
import { Button, ButtonType } from '@/shared/ui/Buttons';

import { User } from '../model/types';

interface UserCardWithFollowProps {
  user: User;
  onFollow: () => void;
}

export const UserCardWithFollow: FC<UserCardWithFollowProps> = ({ user, onFollow }) => {
  const router = useRouter();
  const handleCardClick = () => router.push(`/users/${user.id}`);
  return (
    <div className="grid grid-cols-[70%_30%] gap-2 my-2">
      <UserCard user={user} className="text-sm cursor-pointer" onClick={handleCardClick} />
      <Button variant={ButtonType.PRIMARY} onClick={onFollow} className="h-[35px] text-sm">
        Follow
      </Button>
    </div>
  );
};
