import Image from 'next/image';
import { FC, useEffect, useMemo } from 'react';

import defaultAva from '@/shared/assets/exampleUser/avaImage.png';
import defaultBanner from '@/shared/assets/exampleUser/userBanner.png';
import { ImageUploadButton } from '@/shared/ui/ImageSelector/ImageUploadButton';
import { useImageValidation } from '@/shared/ui/ImageSelector/SelectSingleImageBlock/useImageValidation';

const MAX_FILE_SIZE = 15 * 1024 * 1024;

interface SelectSingleImageProps {
  title: string;
  initialImage?: File | string | null;
  onError: (message: string) => void;
  onChange: (file: File | string | null) => void; // отдаём наружу
}

export const SelectSingleImage: FC<SelectSingleImageProps> = ({
  title,
  initialImage,
  onError,
  onChange,
}) => {
  const { selectedImage, validateAndSetImage, clearImage } = useImageValidation(
    MAX_FILE_SIZE,
    onError,
    initialImage,
  );

  const previewUrl = useMemo(() => {
    if (!selectedImage) return null;
    if (selectedImage instanceof File) {
      return URL.createObjectURL(selectedImage);
    }
    return selectedImage;
  }, [selectedImage]);

  useEffect(() => {
    if (!(selectedImage instanceof File)) return;
    const url = previewUrl;

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [selectedImage, previewUrl]);

  useEffect(() => {
    onChange(selectedImage);
  }, [selectedImage]);

  return (
    <div className="flex items-start gap-4 p-2 rounded-md">
      <div className="flex flex-col gap-2">
        <span className="font-medium">{title}</span>

        <ImageUploadButton onImagesSelected={(files) => validateAndSetImage(files)} />
      </div>

      <div className="flex flex-col items-end gap-1">
        {previewUrl && (
          <div className="relative h-[80px] w-[80px]">
            <Image src={previewUrl} alt="Preview" fill className="object-cover rounded" />

            <button
              type="button"
              onClick={clearImage}
              className="absolute top-1 right-1 bg-gray-800 bg-opacity-75 hover:bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition cursor-pointer"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        )}

        {selectedImage instanceof File && (
          <span className="text-xs text-gray-700 max-w-[80px] truncate">{selectedImage.name}</span>
        )}

        {typeof selectedImage === 'string' && (
          <span className="text-xs text-gray-500 italic">Default image</span>
        )}
      </div>
    </div>
  );
};
