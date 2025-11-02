'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/Button';

export function WithEmailAuthButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/login');
  };

  return (
    <Button variant={'simple'} onClick={handleClick}>
      Sign up with email
    </Button>
  );
}
