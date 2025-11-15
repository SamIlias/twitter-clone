import { StaticImageData } from 'next/image';

import { Tweet } from '@/entities/Tweet/model/types';

export interface User {
  id: number;
  firstName: string;
  secondName: string;
  telegramLink: string;
  status: string;
  email: string;
  avaUrl: string | StaticImageData;
  bannerUrl: string | StaticImageData;
  tweets: Tweet[];
  followingIds: number[];
  followerIds: number[];
}
