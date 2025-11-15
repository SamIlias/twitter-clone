import Image from 'next/image';
import { FC } from 'react';

import { User } from '@/entities/User/model/types';
import { UserFollowsStat } from '@/entities/User/ui/UserFollowsStat';
import { UserNameBlock } from '@/entities/User/ui/UserNameBlock';
import { SimpleButton } from '@/shared/ui/Buttons/SimpleButton';

interface UserProfileProps {
  user: User;
  handleEditClick: () => void;
}

export const UserProfileInfo: FC<UserProfileProps> = ({ user, handleEditClick }) => {
  return (
    <div className="shadow-gray-500 shadow-sm">
      <div className="p-4">
        <p className="font-bold text-md">{`${user.firstName} ${user.secondName}`}</p>
        <p className="text-sm">{`${user.tweets.length} tweets`}</p>
      </div>

      <div className="h-[320px] grid grid-rows-[78%_1fr] relative">
        <div className="relative ">
          <Image src={user.bannerUrl} alt={'banner'} fill className="object-cover object-center" />
        </div>

        <div className="w-[110px] self-center justify-self-end mr-6">
          <SimpleButton
            handleClickAction={handleEditClick}
            title={'Edit profile'}
            className="text-sm h-[35px] py-2 hidden md:block"
          />
        </div>

        <Image
          src={user.avaUrl}
          alt={'ava'}
          width={180}
          height={180}
          className="absolute bottom-0 left-3"
        />
      </div>

      <div className="p-4 flex flex-col gap-4">
        <UserNameBlock
          firstName={user.firstName}
          secondName={user.secondName}
          telegramLink={user.telegramLink}
          className={'text-lg'}
        />

        <span>{user.status}</span>

        <div className="my-4 flex gap-4">
          <UserFollowsStat value={user.followingIds.length} title={'Following'} />
          <UserFollowsStat value={user.followerIds.length} title={'Followers'} />
        </div>
      </div>
    </div>
  );
};
