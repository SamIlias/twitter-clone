import { FC } from 'react';

import { TweetComponent } from '@/entities/Tweet/ui/Tweet';
import { User } from '@/entities/User/model/types';

import { Tweet } from '../model/types';

interface TweetListProps {
  title: string;
  tweets: Tweet[];
  users: User[];
}

export const TweetList: FC<TweetListProps> = ({ tweets, users, title }) => {
  return (
    <div className="flex flex-col">
      <p className="text-xl font-bold m-5">{title}</p>
      <div className="p-6 flex flex-col gap-6">
        {tweets.map((tweet) => {
          const user = users.find((u) => u.id === tweet.userId);
          if (!user) return null;
          return <TweetComponent key={tweet.id} tweet={tweet} user={user} />;
        })}
      </div>
    </div>
  );
};
