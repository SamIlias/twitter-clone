'use client';

import { API_BASE_URL } from '@/shared/constants';

type ResponseCount = {
  count: number;
};

export async function getLikesCount(id: number): Promise<ResponseCount | null> {
  const response = await fetch(`${API_BASE_URL}/tweets/${id}/likes/count`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to load count of likes');
  }

  return data;
}
