import Image from 'next/image';
import { FC, useState } from 'react';

import { Tweet } from '@/entities/Tweet/model/types';
import { AvaImage } from '@/entities/Tweet/ui/AvaImage';
import { User } from '@/entities/User/model/types';
import { UserNameBlock } from '@/entities/User/ui/UserNameBlock';
import { ButtonWithScaling } from '@/shared/ui/Buttons/ButtonWithScaling';
import { HeartIcon } from '@/shared/ui/Icons/SVG';

interface TweetProps {
  tweet: Tweet;
  user: User;
}

export const TweetComponent: FC<TweetProps> = ({ tweet, user }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="flex gap-3">
      <AvaImage avaUrl={user.avaUrl} size={50} />

      <div className="w-full relative flex flex-col gap-2">
        <div className="flex gap-2">
          <UserNameBlock
            firstName={user.firstName}
            secondName={user.secondName}
            telegramLink={user.telegramLink}
            className="flex gap-2"
          />

          <span className="self-start text-[var(--color-text-placeholder)]">{`· ${tweet.createdAt}`}</span>
        </div>
        <span>{tweet.textContent}</span>
        {tweet.image && (
          <div className="relative w-full h-64 mt-2 rounded-lg overflow-hidden">
            <Image src={tweet.image} alt="tweetImage" fill className="object-cover" />
          </div>
        )}
        <div className="flex">
          <ButtonWithScaling handleClick={handleLikeClick} className="focus:outline-none">
            <HeartIcon color="red" filled={isLiked} />
          </ButtonWithScaling>
          <span className="px-2">{tweet.likes}</span>
        </div>
      </div>
    </div>
  );
};
