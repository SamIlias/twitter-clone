import { User } from '@/entities/User/model/types';
import { API_BASE_URL } from '@/shared/constants';

export async function updateUser(payload: User): Promise<User | null> {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Updating failed');
  }

  return data;
}
