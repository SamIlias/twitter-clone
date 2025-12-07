'use client';

import { FC, FormEvent, useState } from 'react';

import { uploadImage } from '@/api/uploadImage';
import { createTweet } from '@/entities/Tweet/api/createTweet';
import { Tweet } from '@/entities/Tweet/model/types';
import { User } from '@/entities/User/model/types';
import { AvaImage } from '@/entities/User/ui/AvaImage';
import { Button, ButtonType } from '@/shared/ui/Buttons';
import { CustomErrorMessage } from '@/shared/ui/ErrorMessage';
import { ImagesPreview } from '@/shared/ui/ImageSelector/ImagesPreview';
import { ImageUploadButton } from '@/shared/ui/ImageSelector/ImageUploadButton';
import { useImageValidation } from '@/shared/ui/ImageSelector/useImagesValidation';
import { TextAreaCustom } from '@/shared/ui/TextAreaCustom';

const MAX_IMAGES_COUNT = 5;
const MAX_TEXT_LENGTH = 500;
const MAX_FILE_SIZE = 15 * 1024 * 1024;

interface AddTweetFormProps {
  user: User;
  addTweet: (tweet: Tweet) => void;
}

export const AddTweetForm: FC<AddTweetFormProps> = ({ user, addTweet }) => {
  const [newTweetValue, setNewTweetValue] = useState('');
  const [error, setError] = useState<unknown>(null);

  const onError = (e: string) => {
    setError(e);
  };

  const { selectedImages, clearImages, validateAndAddImages, removeImage } = useImageValidation(
    MAX_IMAGES_COUNT,
    MAX_FILE_SIZE,
    onError,
  );

  const handleTweetSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTweetValue && selectedImages.length === 0) return;

    try {
      const uploadedImages: string[] = [];

      for (const { file } of selectedImages) {
        const res = await uploadImage(file);
        if (res) {
          const { url } = res;
          uploadedImages.push(url);
        }
      }

      const newTweet = {
        textContent: newTweetValue,
        images: uploadedImages,
      };

      const created = await createTweet(newTweet);

      if (created) {
        addTweet(created);
      }

      setNewTweetValue('');
      clearImages();
    } catch (error) {
      setError(error);
    }
  };

  const handleImagesSelected = (files: File[]) => {
    setError(null);
    validateAndAddImages(files);
  };

  return (
    <div className="flex gap-4 shadow-sm shadow-gray-500/70 p-6 ">
      <AvaImage avaUrl={user.avaUrl} size={50} />

      <form onSubmit={handleTweetSubmit} className="flex flex-col w-full">
        <TextAreaCustom
          value={newTweetValue}
          onChange={setNewTweetValue}
          maxLength={MAX_TEXT_LENGTH}
          onError={setError}
          placeholder={"What's happening"}
        />

        <CustomErrorMessage error={error} />

        <ImagesPreview
          images={selectedImages}
          onRemove={removeImage}
          maxImages={MAX_IMAGES_COUNT}
        />

        <div className="flex justify-between items-center w-full">
          <ImageUploadButton onImagesSelected={handleImagesSelected} />

          <Button
            type="submit"
            className="w-[120px]"
            variant={ButtonType.PRIMARY}
            disabled={!newTweetValue.trim() && selectedImages.length === 0}
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};
