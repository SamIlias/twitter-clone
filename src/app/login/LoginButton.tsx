'use client';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/constants';
import { Button, ButtonType } from '@/shared/ui/Button';

export function LoginButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push(ROUTES.LOGIN);
  };

  return (
    <Button variant={ButtonType.PRIMARY} onClick={handleClick}>
      Log in
    </Button>
  );
}
