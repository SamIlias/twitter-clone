import Image from 'next/image';

import CreateUserForm from '@/app/signup/CreateUserForm';
import signupCover from '@/shared/assets/covers/signupCover.png';
import decoration from '@/shared/assets/images/signUpImage.png';
import { TwitterLogo } from '@/shared/ui/TwitterLogo';
import { Footer } from '@/widgets/Footer/Footer';

const DECORATION_ALT = 'decoration';
const COVER_ALT = 'background';

function SignUpPage() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <div className="h-full flex flex-col md:flex-row flex-1 relative">
        <div className="hidden md:block absolute inset-0">
          <Image
            src={signupCover}
            alt={COVER_ALT}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative h-1/2 md:h-full md:w-1/2">
          <div className="absolute bottom-[20%] left-[20%] md:bottom-[25%] md:left-[20%] h-2/3 md:h-2/5 aspect-square">
            <Image src={decoration} alt={DECORATION_ALT} fill className="object-contain" />
          </div>
        </div>

        <div className="relative z-10 h-full md:w-1/2 flex items-center justify-center px-4 md:px-8 lg:px-12">
          <div className="h-9/10 w-full border border-red-500 px-8 md:px-10 lg:px-15 flex flex-col bg-white/70 dark:bg-gray-900/70 rounded-sm shadow-lg">
            <div className="flex justify-center mt-4">
              <TwitterLogo />
            </div>

            <span className="text-3xl lg:text-3xl my-4 font-semibold text-center lg:text-start text-gray-900 dark:text-gray-100">
              {'Create an account'}
            </span>

            <CreateUserForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUpPage;
