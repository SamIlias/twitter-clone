'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getMe } from '@/api/getMe';
import { getTweets } from '@/api/getTweets';
import { getUsers } from '@/api/getUsers';
import { Tweet } from '@/entities/Tweet/model/types';
import { User } from '@/entities/User/model/types';
import { ROUTES } from '@/shared/constants';
import { Navbar } from '@/widgets/Navbar';
import { SearchBar } from '@/widgets/SearchBar';

import { MainContent } from './MainContent';

export default function ProfilePage() {
  const [isNavOpen, setNavOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handler = () => setNavOpen(mediaQuery.matches);

    handler();
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    async function loadData() {
      const me = await getMe();

      if (!me) {
        router.push(ROUTES.LOGIN);
        return;
      }

      setUser(me);

      const [fetchedUsers, fetchedTweets] = await Promise.all([getUsers(), getTweets()]);

      setUsers(fetchedUsers);
      setTweets(fetchedTweets);

      setLoading(false);
    }

    loadData();
  }, [router]);

  const toggleNav = () => setNavOpen((prev) => !prev);

  if (loading || !user) {
    return <div className="p-4">Loading...</div>;
  }

  const recommendedTweets = tweets.filter((t) => t.userId !== user.id).slice(0, 6);
  const recommendedUsers = users
    .filter((u) => u.id !== user.id)
    .filter((u) => !user.followingIds.includes(u.id));
  const userTweets = tweets.filter((t) => t.userId === user.id);

  return (
    <div className="w-full min-h-screen grid md:grid-cols-[1fr_50%_1fr] overflow-y-auto">
      <Navbar isOpen={isNavOpen} toggleNavAction={toggleNav} user={user} />
      <MainContent handleBurgerClick={toggleNav} user={user} tweets={userTweets} />
      <SearchBar users={recommendedUsers} tweets={recommendedTweets} />
    </div>
  );
}
