import Image from 'next/image';

import LoginForm from '@/app/(auth)/login/LoginForm';
import loginCover from '@/shared/assets/covers/loginCover.png';
import lamp from '@/shared/assets/images/lamp.png';
import boy from '@/shared/assets/images/meditationBoy.png';
import { ROUTES } from '@/shared/constants';
import { CustomLink } from '@/shared/ui/CustomLink';
import { TwitterLogo } from '@/shared/ui/TwitterLogo';

import { AuthLayout } from '../AuthLayout';

const LAMP_ALT = 'lamp';
const BOY_ALT = 'boy';

function Decoration() {
  return (
    <>
      <div className="absolute top-[5%] md:top-[15%] right-[35%] h-1/4 aspect-square">
        <Image src={lamp} alt={LAMP_ALT} fill className="object-contain" />
      </div>

      <div className="absolute bottom-[15%] right-[10%] h-1/2 md:h-2/5 aspect-square">
        <Image src={boy} alt={BOY_ALT} fill className="object-contain" />
      </div>
    </>
  );
}

function Login() {
  return (
    <AuthLayout cover={loginCover} decoration={<Decoration />}>
      <div className="md:h-3/4 h-full w-full p-4 md:p-10 lg:p-20 flex flex-col space-y-2 bg-white/70 dark:bg-gray-900/70 rounded-sm md:mb-20 md:mr-10 shadow-lg">
        <div className="flex justify-center md:justify-start">
          <TwitterLogo />
        </div>

        <h1 className="text-3xl lg:text-4xl my-8 font-semibold text-center lg:text-start text-gray-900 dark:text-gray-100">
          {'Log in to Twitter'}
        </h1>

        <LoginForm />

        <p className="text-center text-sm text-gray-700 dark:text-gray-300">
          {'Don’t have an account? '}
          <CustomLink href={ROUTES.SIGN_UP} name={'Sign Up to Twitter'} />
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;
