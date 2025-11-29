'use client';

import { FC, FormEvent, useState } from 'react';

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
const IMAGE_MOCK =
  'data:image/jpeg;base64,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';

interface AddTweetFormProps {
  user: User;
  setTweets: (tweet: Tweet) => void;
}

export const AddTweetForm: FC<AddTweetFormProps> = ({ user, setTweets }) => {
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
    const newTweet = {
      textContent: newTweetValue,
      image: IMAGE_MOCK,
      // images: selectedImages,
    };

    try {
      const created = await createTweet(newTweet);
      if (created) setTweets(created);

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
