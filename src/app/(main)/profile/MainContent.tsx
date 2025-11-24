'use client';

import { FC, useState } from 'react';

import { ProfileContentHeader } from '@/app/(main)/profile/ProfileContentHeader';
import { Tweet } from '@/entities/Tweet/model/types';
import { AddTweetForm } from '@/entities/Tweet/ui/AddTweetForm';
import { TweetComponent } from '@/entities/Tweet/ui/Tweet';
import { User } from '@/entities/User/model/types';
import { UserProfileInfo } from '@/entities/User/ui';

interface ContentProps {
  handleBurgerClick: () => void;
  user: User;
  tweets: Tweet[];
}

export const MainContent: FC<ContentProps> = ({ handleBurgerClick, user, tweets }) => {
  const [isEditing, setEditing] = useState(false);
  const userTweets = tweets.filter((t) => t.userId === user.id);

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <div className="h-full border-2 border-[var(--color-content-border)]">
      <ProfileContentHeader user={user} handleBurgerClick={handleBurgerClick} />
      <UserProfileInfo user={user} handleEditClick={handleEditClick} />
      <div className="flex flex-col gap-6 ">
        <AddTweetForm user={user} />

        <div className="p-6 flex flex-col gap-6">
          {userTweets.map((tweet) => (
            <TweetComponent key={tweet.id} tweet={tweet} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};
