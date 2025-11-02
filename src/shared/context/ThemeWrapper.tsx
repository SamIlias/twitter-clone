'use client';

import { ReactNode } from 'react';

import { ThemeProvider } from '@/shared/context/ThemeProvider';

export default function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
