import { User } from '@/entities/User/model/types';
import { API_BASE_URL } from '@/shared/constants';

export async function getUserById(id: string): Promise<User | null> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
