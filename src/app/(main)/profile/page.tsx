'use client';

import { useEffect, useState } from 'react';

import { Navbar } from '@/widgets/Navbar';
import { SearchBar } from '@/widgets/SearchBar';

import { MainContent } from './MainContent';

export function ProfilePage() {
  const [isNavOpen, setNavOpen] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('min-width: 1024px');

    const handler = () => {
      setNavOpen(mediaQuery.matches);
    };

    handler();
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  return (
    <div className="w-full min-h-screen grid md:grid-cols-[1fr_50%_1fr] overflow-y-auto">
      <Navbar isOpen={isNavOpen} toggleNavAction={toggleNav} />
      <MainContent handleBurgerClick={toggleNav} />
      <SearchBar />
    </div>
  );
}

export default ProfilePage;
