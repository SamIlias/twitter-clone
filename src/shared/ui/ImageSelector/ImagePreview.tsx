import Image from 'next/image';
import { FC } from 'react';

interface ImagePreviewProps {
  images: File[];
  onRemove: (index: number) => void;
  maxImages: number;
}

export const ImagePreview: FC<ImagePreviewProps> = ({ images, onRemove, maxImages }) => {
  if (images.length === 0) return null;

  return (
    <div className="mb-2">
      <div className={`grid grid-cols-${maxImages} h-[60px] gap-2`}>
        {images.map((image, index) => (
          <div key={image.name} className="relative">
            <Image
              src={URL.createObjectURL(image)}
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover rounded"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 bg-gray-800 bg-opacity-75 hover:bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition cursor-pointer"
              aria-label={`Remove image ${index + 1}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <span className="text-sm text-gray-600 mt-2 inline-block">
        {images.length}/{maxImages}
      </span>
    </div>
  );
};
