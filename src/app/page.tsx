import Image from 'next/image';

import { GoogleAuthButton, WithEmailAuthButton } from '@/features/auth';
import { TwitterLogo } from '@/shared/ui/TwitterLogo';

function SignUpMain() {
  return (
    <div className="w-full h-full mx-auto flex flex-col md:flex-row">
      <div className="relative flex w-full h-[300px] md:w-1/2 flex-col items-center justify-center md:h-full">
        <div className="opacity-50">
          <Image src="/cover.png" alt="cover" fill style={{ objectFit: 'cover' }} />
        </div>

        <div className="w-full h-full grid items-center justify-items-center">
          <div className="relative w-1/3 md:w-[70%] aspect-square z-[3] opacity-90">
            <h1 className="absolute bottom-[-10%] left-[-60%] md:left-[5%] md:top-[-5%] font-[Inter] z-[4] text-text-invert text-[42px] lg:text-[4.5vw] opacity-50">
              Modsen
            </h1>
            <Image src="/logo.png" alt="logo" fill style={{ objectFit: 'contain', zIndex: 2 }} />
          </div>
        </div>
      </div>

      <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center md:items-start items-center text-center p-[var(--spacing-md)]">
        <div className="hidden md:block py-[var(--spacing-md)]">
          <TwitterLogo />
        </div>

        <h1 className="text-4xl text-start md:text-[68px] lg:text-[74px] mb-2 font-bold">
          Happening now
        </h1>

        <div className="w-full lg:w-[70%] flex flex-col gap-2">
          <p className="text-[24px] md:text-[32px] lg:text-5xl font-bold mb-6">
            Join Twitter today
          </p>

          <GoogleAuthButton />
          <WithEmailAuthButton />

          <p className="text-sm mb-[15px]">
            By signing up you agree to the{' '}
            <a href="#" className="text-[color:var(--color-text-link)] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[color:var(--color-text-link)] hover:underline">
              Privacy Policy
            </a>
            , including{' '}
            <a href="#" className="text-[color:var(--color-text-link)] hover:underline">
              Cookie Use
            </a>
            .
          </p>

          <p className="text-sm mb-[15px]">
            Already have an account?{' '}
            <a href="#" className="text-[color:var(--color-text-link)] hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpMain;
