'use client';

import { createContext, useContext } from 'react';

type NavContextType = {
  isNavOpen: boolean;
  toggleNav: () => void;
};

export const NavContext = createContext<NavContextType | null>(null);

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) throw new Error('useNav must be used within NavContext');
  return context;
};
