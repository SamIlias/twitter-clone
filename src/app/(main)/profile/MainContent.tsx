'use client';

import { FC, useState } from 'react';

import { ProfileContentHeader } from '@/app/(main)/profile/ProfileContentHeader';
import { AddTweetForm } from '@/entities/Tweet/ui/AddTweetForm';
import { TweetComponent } from '@/entities/Tweet/ui/Tweet';
import { UserProfileInfo } from '@/entities/User/ui';
import { tweets, users } from '@/shared/constants/exampleUserData';

interface ContentProps {
  handleBurgerClick: () => void;
}

export const MainContent: FC<ContentProps> = ({ handleBurgerClick }) => {
  const [isEditing, setEditing] = useState(false);
  const user = users[0];
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
