import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { Tweet } from '@/entities/Tweet/model/types';
import { User } from '@/entities/User/model/types';
import { AvaImage } from '@/entities/User/ui/AvaImage';
import { UserNameBlock } from '@/entities/User/ui/UserNameBlock';
import { formatDate } from '@/shared/lib/date';
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
  const router = useRouter();
  const handleNameBlockClick = () => router.push(`/users/${user.id}`);

  return (
    <div className="flex gap-3">
      <AvaImage avaUrl={user.avaUrl} className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />

      <div className="w-full relative flex flex-col gap-2" onClick={handleNameBlockClick}>
        <div className="flex flex-col md:flex-row gap-2 cursor-pointer">
          <UserNameBlock
            firstName={user.firstName}
            secondName={user.secondName}
            telegramLink={user.telegramLink}
            className="flex gap-2 flex-col md:flex-row"
          />

          <span className="md:self-center text-[var(--color-text-placeholder)] text-sm">{`${formatDate(tweet.createdAt)}`}</span>
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
