import { StaticImageData } from 'next/image';

export interface User {
  id: number;
  firstName: string;
  secondName: string;
  telegramLink: string;
  status: string;
  email: string;
  avaUrl: string | StaticImageData;
  bannerUrl: string | StaticImageData;
  tweetsIds: number[];
  followingIds: number[];
  followerIds: number[];
}
