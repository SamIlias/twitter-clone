import { FC, ReactNode } from 'react';

import { User } from '@/entities/User/model/types';
import { AvaImage } from '@/entities/User/ui/AvaImage';
import { UserFollowsStat } from '@/entities/User/ui/UserFollowsStat';
import { UserNameBlock } from '@/entities/User/ui/UserNameBlock';
import { defaultBannerUrl } from '@/shared/constants';

interface UserProfileProps {
  user: User;
  children?: ReactNode;
}

export const UserProfileInfo: FC<UserProfileProps> = ({ user, children }) => {
  return (
    <div className="shadow-gray-500/50 shadow-sm">
      <div className="h-[320px] grid grid-rows-[78%_1fr] relative">
        <div className="relative ">
          <img
            src={user.bannerUrl || defaultBannerUrl}
            alt={'banner'}
            className="object-cover h-full w-full"
          />
        </div>

        <div className="w-[110px] self-center justify-self-end mr-6">{children}</div>

        <AvaImage avaUrl={user.avaUrl} size={180} className="absolute bottom-0 left-3" />
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
