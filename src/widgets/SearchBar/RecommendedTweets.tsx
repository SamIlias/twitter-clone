import Image from 'next/image';
import { FC } from 'react';

import { Tweet } from '@/entities/Tweet/model/types';

interface RecommendedTweetsProps {
  tweets: Tweet[];
}

export const RecommendedTweets: FC<RecommendedTweetsProps> = ({ tweets }) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full my-10">
      {tweets.map(({ image, id }) => {
        if (image) {
          return (
            <div key={id} className="relative aspect-square overflow-hidden rounded-lg">
              <Image src={image} alt={'tweet image'} fill className="object-cover" />
            </div>
          );
        }
      })}
    </div>
  );
};
