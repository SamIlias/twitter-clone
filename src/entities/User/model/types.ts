import { GENDER } from '@/shared/constants';

export interface User {
  id: number;
  firstName: string;
  secondName: string;
  telegramLink: string;
  status: string;
  email: string;
  avaUrl: string;
  bannerUrl: string;

  phone?: string | null;
  gender?: GENDER;
  birthDate?: string | null;

  tweetsIds: number[];
  followingIds: number[];
  followerIds: number[];
}

export type RegisterPayload = {
  firstName: string;
  secondName: string;
  phone: string;
  email: string;
  password: string;
  birthDate: string | null;
  telegramLink: string;
  status: string;
  avaUrl: string;
  bannerUrl: string;
};

export type UpdateUserPayload = {
  firstName?: string;
  secondName?: string;
  telegramLink?: string;
  phone?: string;
  email?: string;
  status?: string;
  avaUrl?: string;
  bannerUrl?: string;
  password?: string;
  birthDate?: Date;
};

export type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};
