import { FC, FormEvent, useState } from 'react';

import { AvaImage } from '@/entities/Tweet/ui/AvaImage';
import { User } from '@/entities/User/model/types';
import { Button, ButtonType } from '@/shared/ui/Buttons';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { ImagePreview } from '@/shared/ui/ImageSelector/ImagePreview';
import { ImageUploadButton } from '@/shared/ui/ImageSelector/ImageUploadButton';
import { useImageValidation } from '@/shared/ui/ImageSelector/useImagesValidation';
import { TextAreaCustom } from '@/shared/ui/TextAreaCustom';

const MAX_IMAGES = 5;
const MAX_TEXT_LENGTH = 500;
const MAX_FILE_SIZE = 15 * 1024 * 1024;

interface AddTweetFormProps {
  user: User;
}

export const AddTweetForm: FC<AddTweetFormProps> = ({ user }) => {
  const [newTweetValue, setNewTweetValue] = useState('');
  const [error, setError] = useState<string>('');

  const { selectedImages, setSelectedImages, validateAndAddImages, removeImage } =
    useImageValidation(MAX_IMAGES, MAX_FILE_SIZE, setError);

  const handleTweetSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewTweetValue('');
    setSelectedImages([]);
  };

  const handleImagesSelected = (files: File[]) => {
    setError('');
    validateAndAddImages(files);
  };

  return (
    <div className="flex gap-4 shadow-sm shadow-gray-500 p-6 ">
      <AvaImage avaUrl={user.avaUrl} size={50} />

      <form onSubmit={handleTweetSubmit} className="flex flex-col w-full">
        <TextAreaCustom
          value={newTweetValue}
          onChange={setNewTweetValue}
          maxLength={MAX_TEXT_LENGTH}
          onError={setError}
          placeholder={"What's happening"}
        />

        <ErrorMessage message={error} />

        <ImagePreview images={selectedImages} onRemove={removeImage} maxImages={MAX_IMAGES} />

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
