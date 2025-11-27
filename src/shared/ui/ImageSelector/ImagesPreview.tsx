import Image from 'next/image';
import { FC } from 'react';

import { FileWithId } from '@/shared/ui/ImageSelector/useImagesValidation';

interface ImagePreviewProps {
  images: FileWithId[];
  onRemove: (index: number) => void;
  maxImages: number;
}

export const ImagesPreview: FC<ImagePreviewProps> = ({ images, onRemove, maxImages }) => {
  if (images.length === 0) return null;

  return (
    <div className="mb-2">
      <div className={`grid grid-cols-2 md:grid-cols-5 gap-2`}>
        {images.map((image, index) => {
          const handleRemove = () => onRemove(index);

          return (
            <div key={image.id} className="h-[60px] relative">
              <Image
                src={URL.createObjectURL(image.file)}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover rounded"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-1 right-1 bg-gray-800 bg-opacity-75 hover:bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition cursor-pointer"
                aria-label={`Remove image ${index + 1}`}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      <span className="text-sm text-gray-600 mt-2 inline-block">
        {images.length}/{maxImages}
      </span>
    </div>
  );
};
