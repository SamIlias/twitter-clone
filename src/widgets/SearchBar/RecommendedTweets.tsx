import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Tweet } from '@/entities/Tweet/model/types';

interface RecommendedTweetsProps {
  tweets: Tweet[];
}

export const RecommendedTweets: FC<RecommendedTweetsProps> = ({ tweets }) => {
  const filtered = tweets.filter((t) => !!t.image).slice(0, 6);
  const router = useRouter();

  return (
    <div className="grid grid-cols-3 gap-2 w-full my-10">
      {filtered.map(({ image, id }) => {
        const handleImageClick = () => router.push(`/tweets/${id}`);
        if (image) {
          return (
            <div
              key={id}
              className="relative aspect-square rounded-lg cursor-pointer"
              onClick={handleImageClick}
            >
              <Image src={image} alt={'tweet image'} fill className="object-cover" />
            </div>
          );
        }
      })}
    </div>
  );
};
