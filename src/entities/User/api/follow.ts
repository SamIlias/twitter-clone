import { User } from '@/entities/User/model/types';
import { API_BASE_URL } from '@/shared/constants';

export async function follow(userId: number | string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/follow/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Follow failed');
  }

  return data;
}
