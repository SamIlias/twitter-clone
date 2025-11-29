import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

import defaultAva from '@/shared/assets/exampleUser/avaImage.png';
import { cn } from '@/shared/lib/utils';

interface AvaImageProps {
  avaUrl: string | StaticImageData;
  size?: number;
  className?: string;
}

export const AvaImage: FC<AvaImageProps> = ({ avaUrl, size, className = '' }) => {
  return (
    <div
      className={cn('relative overflow-hidden rounded-full', className)}
      style={size ? { width: size, height: size } : undefined}
    >
      <Image src={avaUrl || defaultAva} alt="ava" fill className="object-cover" />
    </div>
  );
};
