import { User } from '@/entities/User/model/types';
import { API_BASE_URL } from '@/shared/constants';

export async function unfollow(userId: number | string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/unfollow/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unfollow failed');
  }

  return data;
}
