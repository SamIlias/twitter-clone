import Image from 'next/image';

import LoginForm from '@/app/login/LoginForm';
import loginCover from '@/shared/assets/covers/loginCover.png';
import lamp from '@/shared/assets/images/lamp.png';
import boy from '@/shared/assets/images/meditationBoy.png';
import { CustomLink } from '@/shared/ui/CustomLink';
import { TwitterLogo } from '@/shared/ui/TwitterLogo';
import { Footer } from '@/widgets/Footer/Footer';

const LOGIN_LINKS = {
  signUp: '#',
};

const LAMP_ALT = 'lamp';
const BOY_ALT = 'boy';
const COVER_ALT = 'Login background';

function Login() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <div className="h-full flex flex-col md:flex-row flex-1 relative">
        <div className="hidden md:block absolute inset-0">
          <Image
            src={loginCover}
            alt={COVER_ALT}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative h-full md:w-1/2">
          <div className="absolute top-[5%] md:top-[15%] right-[35%] h-1/4 aspect-square">
            <Image src={lamp} alt={LAMP_ALT} fill className="object-contain" />
          </div>

          <div className="absolute bottom-[15%] right-[10%] h-1/2 md:h-2/5 aspect-square">
            <Image src={boy} alt={BOY_ALT} fill className="object-contain" />
          </div>
        </div>

        <div className="relative z-10 h-full md:w-1/2 flex items-end justify-center px-4 md:px-8 lg:px-12">
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
              <CustomLink href={LOGIN_LINKS.signUp} name={'Sign Up to Twitter'} />
            </p>
          </div>
        </div>
      </div>
      <Footer />;
    </div>
  );
}

export default Login;
