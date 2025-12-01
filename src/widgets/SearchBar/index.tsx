'use client';

import { useEffect, useState } from 'react';

import { getTweets } from '@/api/getTweets';
import { getUsers } from '@/api/getUsers';
import { useUser } from '@/app/(main)/context/UserContext';
import { Tweet } from '@/entities/Tweet/model/types';
import { User } from '@/entities/User/model/types';
import { SearchInput } from '@/shared/ui/SearchInput';
import { RecommendedTweets } from '@/widgets/SearchBar/RecommendedTweets';
import { RecommendedUsers } from '@/widgets/SearchBar/RecommendedUsers';

export const SearchBar = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, refreshUser } = useUser();
  const me = user;

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const [fetchedUsers, fetchedTweets] = await Promise.all([getUsers(), getTweets()]);
      setUsers(fetchedUsers);
      setTweets(fetchedTweets);

      setLoading(false);
    }

    loadData();
  }, []);

  const handleFollowSuccess = async () => {
    refreshUser();
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
  };

  const recommendedTweets = me ? tweets.filter((t) => t.userId !== me.id) : [];
  const recommendedUsers = me
    ? users.filter((u) => u.id !== me.id).filter((u) => !me.followingIds.includes(u.id))
    : [];

  return (
    <div className="h-full p-6 flex flex-col gap-4">
      <SearchInput onSearch={() => {}} placeholder="Search Twitter" />
      {loading && <p className="text-amber-700">Loading...</p>}
      <RecommendedTweets tweets={recommendedTweets} />
      <RecommendedUsers users={recommendedUsers} onFollowSuccess={handleFollowSuccess} />
      <span className="text-sm text-center mt-10">{'Modsen Twitter © 2025 Twitter, Inc.'}</span>
    </div>
  );
};
