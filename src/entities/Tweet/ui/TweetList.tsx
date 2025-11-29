import { FC } from 'react';

import { TweetComponent } from '@/entities/Tweet/ui/Tweet';
import { User } from '@/entities/User/model/types';

import { Tweet } from '../model/types';

interface TweetListProps {
  tweets: Tweet[];
  user: User;
}

export const TweetList: FC<TweetListProps> = ({ tweets, user }) => {
  return (
    <div className="flex flex-col gap-6 ">
      <div className="p-6 flex flex-col gap-6">
        {tweets.map((tweet) => (
          <TweetComponent key={tweet.id} tweet={tweet} user={user} />
        ))}
      </div>
    </div>
  );
};
