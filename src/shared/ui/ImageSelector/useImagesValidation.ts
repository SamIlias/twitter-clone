import { useState } from 'react';

export const useImageValidation = (
  maxImages: number,
  maxFileSize: number,
  onError: (err: string) => void,
) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const validateAndAddImages = (files: File[]) => {
    onError('');

    if (selectedImages.length + files.length > maxImages) {
      onError(`You can choose only ${maxImages} images`);
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        onError('You have to choose only images');
        return;
      }

      if (file.size > maxFileSize) {
        onError(`The file "${file.name}" is too big. The max allowed size is 15MB`);
        return;
      }
    }

    setSelectedImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    onError('');
  };

  return {
    selectedImages,
    setSelectedImages,
    validateAndAddImages,
    removeImage,
  };
};
