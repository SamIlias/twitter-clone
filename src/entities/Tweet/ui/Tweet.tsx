import { useRouter } from 'next/navigation';
import { FC, MouseEvent, useEffect, useState } from 'react';

import { getLikesCount } from '@/entities/Tweet/api/getCount';
import { getIsLiked } from '@/entities/Tweet/api/getIsLiked';
import { toggleLike } from '@/entities/Tweet/api/toggleLike';
import { Tweet } from '@/entities/Tweet/model/types';
import { User } from '@/entities/User/model/types';
import { AvaImage } from '@/entities/User/ui/AvaImage';
import { UserNameBlock } from '@/entities/User/ui/UserNameBlock';
import { formatDate } from '@/shared/lib/date';
import { ButtonWithScaling } from '@/shared/ui/Buttons/ButtonWithScaling';
import { CustomErrorMessage } from '@/shared/ui/ErrorMessage';
import { HeartIcon } from '@/shared/ui/Icons/SVG';

interface TweetProps {
  tweet: Tweet;
  user: User;
}

export const TweetComponent: FC<TweetProps> = ({ tweet, user }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [likesCount, setLikesCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const loadTweetInfo = async () => {
      try {
        setError(null);

        const isLikedRes = await getIsLiked(tweet.id);
        if (isLikedRes) setIsLiked(isLikedRes.isLiked);

        const countLikes = await getLikesCount(tweet.id);
        if (countLikes) setLikesCount(countLikes.count);
      } catch (err) {
        setError(err);
      }
    };

    loadTweetInfo();
  }, [tweet.id]);

  const handleLikeClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      setError(null);
      const likedRes = await toggleLike(tweet.id);
      if (likedRes) setIsLiked(likedRes.liked);

      const countLikes = await getLikesCount(tweet.id);
      if (countLikes) setLikesCount(countLikes.count);
    } catch (err) {
      setError(err);
    }
  };

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

          <span className="md:self-center text-[var(--color-text-placeholder)] text-sm">
            {formatDate(tweet.createdAt)}
          </span>
        </div>

        <CustomErrorMessage error={error} />

        <span>{tweet.textContent}</span>

        {Array.isArray(tweet.images) && tweet.images.length > 0 && (
          <div
            className="
          grid grid-cols-1 sm:grid-cols-2
          gap-2 mt-2 w-full
          rounded-lg overflow-hidden
        "
          >
            {tweet.images.map((src, ind) => {
              return (
                <div key={ind} className="relative w-full overflow-hidden rounded-md aspect-video">
                  <img
                    src={src}
                    alt="tweetImage"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="flex">
          <ButtonWithScaling handleClick={handleLikeClick} className="focus:outline-none">
            <HeartIcon color="red" filled={isLiked} />
          </ButtonWithScaling>
          <span className="px-2">{likesCount}</span>
        </div>
      </div>
    </div>
  );
};
