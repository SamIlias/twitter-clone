import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

import { Footer } from '@/widgets/Footer/Footer';

interface AuthLayoutProps {
  cover: StaticImageData;
  coverAlt?: string;
  decoration: ReactNode;
  children: ReactNode;
}

export function AuthLayout({
  cover,
  coverAlt = 'background',
  decoration,
  children,
}: AuthLayoutProps) {
  return (
    <div className="w-full min-h-screen md:h-screen flex flex-col overflow-y-auto">
      <div className="flex h-[1000px] md:h-auto flex-col md:flex-row flex-1 relative">
        <div className="hidden md:block absolute inset-0">
          <Image src={cover} alt={coverAlt} fill className="object-cover object-center" priority />
        </div>

        <div className="relative h-[300px] md:h-full md:w-1/2">{decoration}</div>

        <div className="relative z-10 h-2/3 md:h-full md:w-1/2 flex items-center justify-center md:p-8 lg:px-12">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
