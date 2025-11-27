'use client';
import Image from 'next/image';

import { loginWithGoogle } from '@/api/loginWithGoogle';
import icon from '@/shared/assets/icons/googleIcon.png';
import { Button, ButtonType } from '@/shared/ui/Buttons';

const ICON_ALT = 'Icon';
const buttonIconSize = 32;

export function GoogleAuthButton() {
  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <Button variant={ButtonType.SIMPLE} onClick={handleGoogleLogin}>
      <Image
        className="pr-2"
        src={icon}
        alt={ICON_ALT}
        width={buttonIconSize}
        height={buttonIconSize}
      />
      Sign up with Google
    </Button>
  );
}
