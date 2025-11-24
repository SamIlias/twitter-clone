import { FC } from 'react';

import { Tweet } from '@/entities/Tweet/model/types';
import { User } from '@/entities/User/model/types';
import { SearchInput } from '@/shared/ui/SearchInput';
import { RecommendedTweets } from '@/widgets/SearchBar/RecommendedTweets';
import { RecommendedUsers } from '@/widgets/SearchBar/RecommendedUsers';

interface SearchBarProps {
  tweets: Tweet[];
  users: User[];
}

export const SearchBar: FC<SearchBarProps> = ({ tweets, users }) => {
  return (
    <div className="h-full p-6 md:flex flex-col gap-4 hidden ">
      <SearchInput onSearch={() => {}} placeholder="Search Twitter" />
      <RecommendedTweets tweets={tweets} />
      <RecommendedUsers users={users} />
      <span className="text-sm text-center mt-10">{'Modsen Twitter © 2025 Twitter, Inc.'}</span>
    </div>
  );
};
