import { GoogleAuthButton, WithEmailAuthButton } from '@/features/auth';
import { TwitterLogo } from '@/shared/ui/TwitterLogo';

export function SignUpMainContent() {
  return (
    <div className="flex-1 w-full md:w-1/2 flex flex-col md:gap-8 justify-center md:items-start items-center text-center p-[var(--spacing-md)]">
      <div className="hidden md:block py-[var(--spacing-md)]">
        <TwitterLogo />
      </div>

      <h1 className="text-4xl text-start md:text-[68px] lg:text-[74px] mb-5 font-bold">
        Happening now
      </h1>

      <div className="w-full lg:w-[70%] flex flex-col gap-4">
        <p className="text-[24px] md:text-[32px] lg:text-5xl font-bold mb-10">Join Twitter today</p>

        <GoogleAuthButton />
        <WithEmailAuthButton />

        <p className="text-sm mb-[15px]">
          {'By signing up you agree to the '}
          <a href="#" className="text-[color:var(--color-text-link)] hover:underline">
            {'Terms of Service '}
          </a>
          {'and '}
          <a href="#" className="text-[color:var(--color-text-link)] hover:underline">
            {'Privacy Policy '}
          </a>
          {', including '}
          <a href="#" className="text-[color:var(--color-text-link)] hover:underline">
            {'Cookie Use'}
          </a>
          .
        </p>

        <p className="text-sm mb-[15px]">
          {'Already have an account? '}
          <a href="#" className="text-[color:var(--color-text-link)] hover:underline">
            {'Log in'}
          </a>
        </p>
      </div>
    </div>
  );
}
