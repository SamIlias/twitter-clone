import { GoogleAuthButton, WithEmailAuthButton } from '@/features/auth';
import { CustomLink } from '@/shared/ui/CustomLink';
import { TwitterLogo } from '@/shared/ui/TwitterLogo';

const LINKS = {
  terms: '/terms',
  privacy: '/privacy',
  cookies: '/cookies',
  login: '/login',
};

export function SignUpMainContent() {
  return (
    <div className="flex-1 w-full md:w-1/2 flex flex-col md:gap-8 justify-center md:items-start items-center text-center p-6 md:p-8">
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
          <CustomLink href={LINKS.terms} name={'Terms of Service'} />
          {' and '}
          <CustomLink href={LINKS.privacy} name={'Privacy Policy'} />
          {', including '}
          <CustomLink href={LINKS.cookies} name={'Cookie Use'} />
          {'.'}
        </p>

        <p className="text-sm mb-4">
          {'Already have an account? '}
          <CustomLink href={LINKS.login} name={'Log in'} />
          {'.'}
        </p>
      </div>
    </div>
  );
}
