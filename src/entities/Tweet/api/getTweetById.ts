import { Tweet } from '@/entities/Tweet/model/types';
import { API_BASE_URL } from '@/shared/constants';

export async function getTweetById(id: string | number): Promise<Tweet | null> {
  const response = await fetch(`${API_BASE_URL}/tweets/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
