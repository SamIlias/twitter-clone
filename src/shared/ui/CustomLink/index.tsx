import Link from 'next/link';
import { FC } from 'react';

import { cn } from '@/shared/lib/utils';

interface CustomLinkProps {
  href: string;
  name: string;
  className?: string;
}

export const CustomLink: FC<CustomLinkProps> = ({ href, name, className = '' }) => {
  return (
    <Link
      href={href}
      className={cn(`text-[color:var(--color-text-link)] hover:underline`, className)}
    >
      {name}
    </Link>
  );
};
