'use client';

import Link from 'next/link';
import { ElementType } from 'react';

interface NavButtonProps {
  Icon: ElementType;
  title: string;
  href: string;
}

export function NavButton({ Icon, title, href }: NavButtonProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-4 px-4 py-2 transition-colors">
      <Icon />
      {title}
    </Link>
  );
}
