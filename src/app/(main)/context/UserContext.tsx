'use client';

import { createContext, useContext } from 'react';

import { User } from '@/entities/User/model/types';

type UserContext = {
  user: User | null;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContext | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within the context!');
  return context;
};
