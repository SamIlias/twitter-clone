import Image from 'next/image';

import { AuthLayout } from '@/app/(auth)/AuthLayout';
import CreateUserForm from '@/app/(auth)/signup/CreateUserForm';
import signupCover from '@/shared/assets/covers/signupCover.png';
import decoration from '@/shared/assets/images/signUpImage.png';
import { TwitterLogo } from '@/shared/ui/TwitterLogo';

const DECORATION_ALT = 'decoration';

function Decoration() {
  return (
    <div className="absolute bottom-[20%] left-[20%] md:bottom-[25%] md:left-[20%] h-2/3 md:h-2/5 aspect-square">
      <Image src={decoration} alt={DECORATION_ALT} fill className="object-contain" />
    </div>
  );
}

function SignUpPage() {
  return (
    <AuthLayout cover={signupCover} decoration={<Decoration />}>
      <div className="h-full w-full px-8 md:px-10 lg:px-15 flex flex-col bg-white/70 dark:bg-gray-900/70 rounded-sm shadow-lg">
        <div className="flex justify-center mt-4">
          <TwitterLogo />
        </div>

        <span className="text-3xl lg:text-3xl my-4 font-semibold text-center lg:text-start text-gray-900 dark:text-gray-100">
          {'Create an account'}
        </span>

        <CreateUserForm />
      </div>
    </AuthLayout>
  );
}

export default SignUpPage;
