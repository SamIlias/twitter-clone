import Image from 'next/image';

import LoginForm from '@/app/login/LoginForm';
import { TwitterLogo } from '@/shared/ui/TwitterLogo';
import { Footer } from '@/widgets/Footer/Footer';

function Login() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <div className="h-full flex flex-col md:flex-row flex-1 md:bg-[url('/loginCover.png')] bg-cover bg-center">
        <div className="relative h-full md:h-full md:w-1/2">
          <div className="absolute top-[5%] md:top-[15%] right-[35%] h-1/4 aspect-square">
            <Image src="/lamp.png" alt="Lamp" fill className="object-contain" />
          </div>

          <div className="absolute bottom-[15%] right-[10%] h-1/2 md:h-2/5 aspect-square">
            <Image src="/meditationBoy.png" alt="Boy" fill className="object-contain" />
          </div>
        </div>

        <div className="h-full md:w-1/2 flex items-end justify-center px-4 md:px-8 lg:px-12">
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
              <a href="#" className="text-[color:var(--color-text-link)] hover:underline">
                {'Sign Up to Twitter'}
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
