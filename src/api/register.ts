'use server';

import { RegisterPayload } from '@/entities/User/model/types';
import { API_BASE_URL } from '@/shared/constants';

export async function register(
  payload: RegisterPayload,
  setError: (msg: string | null) => void,
): Promise<RegisterPayload | null> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    setError(data.message || 'Registration failed');
    return null;
  }

  return data;
}
