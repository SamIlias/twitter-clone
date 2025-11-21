import { StaticImageData } from 'next/image';

export interface Tweet {
  id: number;
  userId: number;
  textContent: string;
  createdAt: string;
  image?: string | StaticImageData;
  likes: number;
}
