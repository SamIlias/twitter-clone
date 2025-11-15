import { ChangeEvent, FC, useRef } from 'react';

import { ButtonWithScaling } from '@/shared/ui/Buttons/ButtonWithScaling';
import { PictureIcon } from '@/shared/ui/Icons/SVG';

interface ImageUploadButtonProps {
  onImagesSelected: (files: File[]) => void;
  disabled?: boolean;
  iconColor?: string;
}

export const ImageUploadButton: FC<ImageUploadButtonProps> = ({
  onImagesSelected,
  iconColor = '#1DA1F2',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      onImagesSelected(files);
    }
    event.target.value = '';
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      <ButtonWithScaling className="ml-4 focus:outline-none" handleClick={handleClick}>
        <PictureIcon width={22} height={22} color={iconColor} />
      </ButtonWithScaling>
    </>
  );
};
