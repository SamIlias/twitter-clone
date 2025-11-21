import Link from 'next/link';
import { FC } from 'react';

interface CustomLinkProps {
  href: string;
  name: string;
  additionalClassName?: string;
}

export const CustomLink: FC<CustomLinkProps> = ({ href, name, additionalClassName }) => {
  return (
    <Link
      href={href}
      className={`text-[color:var(--color-text-link)] hover:underline${additionalClassName ? ` ${additionalClassName}` : ''}`}
    >
      {name}
    </Link>
  );
};
