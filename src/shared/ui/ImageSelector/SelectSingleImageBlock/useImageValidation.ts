import { useState } from 'react';

export const useImageValidation = (
  maxFileSize: number,
  onError: (err: string) => void,
  initialImage?: File | string | null,
) => {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(initialImage ?? null);

  const clearImage = () => {
    setSelectedImage(null);
    onError('');
  };

  const validateAndSetImage = (files: FileList | File[]) => {
    onError('');

    if (!files || files.length === 0) return;

    const file = files[0]; // игнорируем остальные

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

    setSelectedImage(file);
  };

  const resetToInitial = () => {
    setSelectedImage(initialImage ?? null);
    onError('');
  };

  return {
    selectedImage,
    validateAndSetImage,
    clearImage,
    resetToInitial,
  };
};
