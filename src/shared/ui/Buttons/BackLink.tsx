'use client';

import { useRouter } from 'next/navigation';

export const BackLink = () => {
  const router = useRouter();
  const handleClick = () => router.back();

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer text-[var(--color-text-primary)] font-bold hover:no-underline hover:text-blue-400"
    >
      {'<-- | Back'}
    </button>
  );
};
