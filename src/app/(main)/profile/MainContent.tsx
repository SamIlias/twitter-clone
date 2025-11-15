'use client';

import { useState } from 'react';

import { AddTweetForm } from '@/entities/Tweet/ui/AddTweetForm';
import { TweetComponent } from '@/entities/Tweet/ui/Tweet';
import { UserProfileInfo } from '@/entities/User/ui';
import { user } from '@/shared/constants/exampleUserData';

export const MainContent = () => {
  const [isEditing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <div className="h-full">
      <UserProfileInfo user={user} handleEditClick={handleEditClick} />
      <div className="flex flex-col gap-6 shadow-sm shadow-gray-500">
        <AddTweetForm user={user} />
        <div className="p-6 flex flex-col gap-6">
          {user.tweets.map((tweet) => (
            <TweetComponent key={tweet.id} tweet={tweet} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};
