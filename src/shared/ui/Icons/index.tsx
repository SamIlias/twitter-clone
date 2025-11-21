import Image, { StaticImageData } from 'next/image';

import hideIcon from '@/shared/assets/icons/eyeHide.png';
import showIcon from '@/shared/assets/icons/eyeShow.png';

interface ThemedIconProps {
  src: StaticImageData;
  alt: string;
  size: number;
}

const ThemedIcon = ({ src, alt, size }: ThemedIconProps) => {
  return <Image src={src} alt={alt} width={size} height={size} />;
};

const iconSize = 20;

export const HidePasswordIcon = () => <ThemedIcon src={hideIcon} alt="hide" size={iconSize} />;
export const ShowPasswordIcon = () => <ThemedIcon src={showIcon} alt="show" size={iconSize} />;
