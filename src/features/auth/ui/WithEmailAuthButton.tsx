'use client';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/constants';
import { Button, ButtonType } from '@/shared/ui/Buttons';

export function WithEmailAuthButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push(ROUTES.SIGN_UP);
  };

  return (
    <Button variant={ButtonType.SIMPLE} onClick={handleClick}>
      Sign up with email
    </Button>
  );
}
