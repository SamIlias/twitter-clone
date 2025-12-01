'use client';

import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { getMe } from '@/api/getMe';
import { User } from '@/entities/User/model/types';
import { ROUTES } from '@/shared/constants';

type UserContextProps = {
  user: User | null;
  setUser: (user: User) => void;
  loading: boolean;
  refreshUser: () => void;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const me = await getMe();

      if (!me) {
        router.push(ROUTES.LOGIN);
        return;
      }

      setUser(me);

      setLoading(false);
    }

    loadData();
  }, [router]);

  const refreshUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch (e) {
      console.error('Failed to refresh user:', e);
    }
  };

  return <UserContext value={{ user, setUser, loading, refreshUser }}>{children}</UserContext>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within the context!');
  return context;
};
