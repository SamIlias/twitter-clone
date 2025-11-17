import { useRef, useState } from 'react';

export type FileWithId = {
  file: File;
  id: number;
};

export const useImageValidation = (
  maxImagesCount: number,
  maxFileSize: number,
  onError: (err: string) => void,
) => {
  const [selectedImages, setSelectedImages] = useState<FileWithId[]>([]);

  const fileIdCounter = useRef(0);

  const clearImages = () => {
    setSelectedImages([]);
  };

  const validateAndAddImages = (files: File[]) => {
    onError('');

    if (selectedImages.length + files.length > maxImagesCount) {
      onError(`You can choose only ${maxImagesCount} images`);
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        onError('You have to choose only images');
        return;
      }

      if (file.size > maxFileSize) {
        onError(
          `The file "${file.name}" is too big. The max allowed size is ${(maxFileSize / 1024 / 1024).toFixed(0)}MB`,
        );
        return;
      }
    }

    setSelectedImages((prev) => [
      ...prev,
      ...files.map((file) => ({ file, id: fileIdCounter.current++ })),
    ]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    onError('');
  };

  return {
    selectedImages,
    clearImages,
    validateAndAddImages,
    removeImage,
  };
};
