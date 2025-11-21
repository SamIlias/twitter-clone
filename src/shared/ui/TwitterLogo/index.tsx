import Image from 'next/image';

import logo from '@/shared/assets/icons/logo.png';

const LOGO_ALT = 'Logo';
import { FC } from 'react';

const logoWidth = 50;
const logoHeight = 41;

interface TwitterLogoProps {
  width?: number;
  height?: number;
}

export const TwitterLogo: FC<TwitterLogoProps> = ({ width = logoWidth, height = logoHeight }) => {
  return <Image src={logo} alt={LOGO_ALT} width={width} height={height} />;
};
