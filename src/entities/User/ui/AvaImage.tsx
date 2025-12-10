import { FC } from 'react';

import { defaultAvaUrl } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';

interface AvaImageProps {
  avaUrl: string;
  size?: number;
  className?: string;
}

export const AvaImage: FC<AvaImageProps> = ({ avaUrl, size, className = '' }) => {
  return (
    <div
      className={cn('relative overflow-hidden rounded-full', className)}
      style={size ? { width: size, height: size } : undefined}
    >
      <img src={avaUrl || defaultAvaUrl} alt="ava" className="w-full h-full object-cover" />
    </div>
  );
};
