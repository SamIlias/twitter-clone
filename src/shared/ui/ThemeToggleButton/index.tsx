'use client';

import { Theme, useTheme } from '@/shared/context/ThemeProvider';
import { cn } from '@/shared/lib/utils';

export const ThemeToggleButton = ({ className = '' }: { className: string }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === Theme.DARK;

  return (
    <div
      data-testid="toggle-theme"
      onClick={toggleTheme}
      className={cn(
        'w-[35px] h-[20px] rounded-xl cursor-pointer flex items-center relative border ',
        className,
      )}
    >
      <div
        className={`border w-[14px] h-[14px] bg-[var(--color-text-primary)] absolute rounded-full flex items-center justify-center transition-all duration-300 top-1/2 -translate-y-1/2 ${
          isDark ? 'translate-x-[3px]' : 'translate-x-[17px]'
        }`}
      ></div>
    </div>
  );
};
