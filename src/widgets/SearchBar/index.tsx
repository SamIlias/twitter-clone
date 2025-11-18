import { FC } from 'react';

import { Tweet } from '@/entities/Tweet/model/types';
import { User } from '@/entities/User/model/types';
import { tweets, users } from '@/shared/constants/exampleUserData';
import { SearchInput } from '@/shared/ui/SearchInput';
import { RecommendedTweets } from '@/widgets/SearchBar/RecommendedTweets';
import { RecommendedUsers } from '@/widgets/SearchBar/RecommendedUsers';

export const SearchBar: FC = () => {
  const user = users[0];
  const recommendedTweets: Tweet[] = tweets.filter((t) => t.userId !== user.id).slice(0, 6);
  const recommendedUsers: User[] = users.slice(1).filter((u) => !user.followingIds.includes(u.id));

  return (
    <div className="h-full p-6 md:flex flex-col gap-4 hidden ">
      <SearchInput onSearch={() => {}} placeholder="Search Twitter" />
      <RecommendedTweets tweets={recommendedTweets} />
      <RecommendedUsers users={recommendedUsers} />
      <span className="text-sm text-center mt-10">{'Modsen Twitter © 2025 Twitter, Inc.'}</span>
    </div>
  );
};
