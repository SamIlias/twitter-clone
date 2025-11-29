import { Tweet } from '@/entities/Tweet/model/types';
import { API_BASE_URL } from '@/shared/constants';

export async function getTweets(): Promise<Tweet[]> {
  const response = await fetch(`${API_BASE_URL}/tweets`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to load tweets');
  }

  return response.json();
}

export async function getTweetsByUserId(userId: number): Promise<Tweet[]> {
  const response = await fetch(`${API_BASE_URL}/tweets/user/${userId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to load tweets');
  }

  return response.json();
}
