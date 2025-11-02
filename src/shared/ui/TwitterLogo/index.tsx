import Image from 'next/image';
import { FC } from 'react';

const logoWidth = 50;
const logoHeight = 41;

interface TwitterLogoProps {
  width?: number;
  height?: number;
}

export const TwitterLogo: FC<TwitterLogoProps> = ({ width = logoWidth, height = logoHeight }) => {
  return <Image src="/logo.png" alt="logo" width={width} height={height} />;
};
