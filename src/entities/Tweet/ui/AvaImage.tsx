import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

interface AvaImageProps {
  avaUrl: string | StaticImageData;
  size: number;
}

export const AvaImage: FC<AvaImageProps> = ({ avaUrl, size }) => {
  return (
    <div className="relative">
      <Image src={avaUrl} alt={'ava'} width={size} height={size} />
    </div>
  );
};
