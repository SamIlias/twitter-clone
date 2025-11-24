import { User } from '@/entities/User/model/types';
import { API_BASE_URL } from '@/shared/constants';

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to load users');
  }

  return response.json();
}
