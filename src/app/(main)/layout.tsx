'use client';

import { ReactNode, useEffect, useState } from 'react';

import { NavContext } from '@/app/(main)/context/NavContext';
import { UserProvider } from '@/app/(main)/context/UserContext';
import { Navbar } from '@/widgets/Navbar';
import { SearchBar } from '@/widgets/SearchBar';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isNavOpen, setNavOpen] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handler = () => setNavOpen(mediaQuery.matches);

    handler();
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleNav = () => setNavOpen((prev) => !prev);

  return (
    <UserProvider>
      <NavContext value={{ isNavOpen, toggleNav }}>
        <div className="w-full min-h-screen grid md:grid-cols-[1fr_50%_1fr] overflow-y-auto">
          <Navbar />
          {children}
          <SearchBar />
        </div>
      </NavContext>
    </UserProvider>
  );
}
