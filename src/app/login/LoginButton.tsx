'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/Button';

export function LoginButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/login');
  };

  return (
    <Button variant={'primary'} onClick={handleClick}>
      Log in
    </Button>
  );
}
