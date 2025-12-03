'use client';

import { API_BASE_URL } from '@/shared/constants';

type ToggleLikeResponse = {
  liked: boolean;
};

export async function toggleLike(id: number): Promise<ToggleLikeResponse | null> {
  const response = await fetch(`${API_BASE_URL}/tweets/${id}/likes`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed toggle like');
  }

  return data;
}
