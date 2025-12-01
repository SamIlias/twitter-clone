'use client';

import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { useUser } from '@/app/(main)/context/UserContext';
import { follow } from '@/entities/User/api/follow';
import { UserCard } from '@/entities/User/ui/UserCard';
import { Button, ButtonType } from '@/shared/ui/Buttons';
import { CustomErrorMessage } from '@/shared/ui/ErrorMessage';

import { User } from '../model/types';

interface UserCardWithFollowProps {
  user: User;
  onFollowSuccess: () => void;
}

export const UserCardWithFollow: FC<UserCardWithFollowProps> = ({ user, onFollowSuccess }) => {
  const [error, setError] = useState<unknown>(null);
  const router = useRouter();

  const handleCardClick = () => router.push(`/users/${user.id}`);
  const handleFollow = async () => {
    try {
      await follow(user.id);
      onFollowSuccess();
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="grid grid-cols-[70%_30%] gap-2 my-2">
      {error ? (
        <CustomErrorMessage error={error} />
      ) : (
        <>
          <UserCard user={user} className="text-sm cursor-pointer" onClick={handleCardClick} />
          <Button variant={ButtonType.PRIMARY} onClick={handleFollow} className="h-[35px] text-sm">
            Follow
          </Button>
        </>
      )}
    </div>
  );
};
