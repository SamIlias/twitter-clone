'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { getMe } from '@/api/getMe';
import { getTweets } from '@/api/getTweets';
import { getUsers } from '@/api/getUsers';
import { NavContext } from '@/app/(main)/context/NavContext';
import { UserContext } from '@/app/(main)/context/UserContext';
import { Tweet } from '@/entities/Tweet/model/types';
import { User } from '@/entities/User/model/types';
import { ROUTES } from '@/shared/constants';
import { Navbar } from '@/widgets/Navbar';
import { SearchBar } from '@/widgets/SearchBar';

export default function RootLayout({ children }: { children: ReactNode }) {
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

  const recommendedTweets = user ? tweets.filter((t) => t.userId !== user.id).slice(0, 6) : [];
  const recommendedUsers = user
    ? users.filter((u) => u.id !== user.id).filter((u) => !user.followingIds.includes(u.id))
    : [];

  return (
    <UserContext value={{ user, setUser }}>
      <NavContext value={{ isNavOpen, toggleNav }}>
        <div className="w-full min-h-screen grid md:grid-cols-[1fr_50%_1fr] overflow-y-auto">
          <Navbar />
          {(loading || !user) && <div className="p-4">Loading...</div>}
          {children}
          <SearchBar users={recommendedUsers} tweets={recommendedTweets} />
        </div>
      </NavContext>
    </UserContext>
  );
}
