'use client';
import Image from 'next/image';

import { Button } from '@/shared/ui/Button';

const buttonIconSize = 32;

export function GoogleAuthButton() {
  return (
    <Button variant={'simple'} onClick={() => alert('sfa')}>
      <Image
        className="pr-2"
        src="/googleIcon.png"
        alt="goggle icon"
        width={buttonIconSize}
        height={buttonIconSize}
      />
      Sign up with Google
    </Button>
  );
}
