import Image from 'next/image';

import cover from '@/shared/assets/covers/cover.png';
import logo from '@/shared/assets/icons/logo.png';

const COVER_ALT = 'Cover';
const LOGO_ALT = 'Logo';

export function SignUpMainCover() {
  return (
    <div
      className={`relative flex w-full h-1/4 md:w-1/2 flex-col items-center justify-center md:h-full`}
    >
      <div className="opacity-50">
        <Image src={cover} alt={COVER_ALT} fill style={{ objectFit: 'cover' }} />
      </div>

      <div className="w-full h-full grid items-center justify-items-center">
        <div className="relative h-2/3 md:w-[70%] aspect-square z-[2] opacity-90">
          <h1 className="absolute bottom-[-10%] left-[-60%] md:left-[5%] md:top-[-5%] font-[Inter] z-[3] text-text-invert text-4xl font-bold lg:text-[4.5vw] opacity-70">
            {'Modsen'}
          </h1>
          <Image src={logo} alt={LOGO_ALT} fill style={{ objectFit: 'contain', zIndex: 2 }} />
        </div>
      </div>
    </div>
  );
}
