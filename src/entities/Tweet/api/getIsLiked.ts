'use client';

import { API_BASE_URL } from '@/shared/constants';

type ResponseIsLiked = {
  isLiked: boolean;
};

export async function getIsLiked(id: number): Promise<ResponseIsLiked | null> {
  const response = await fetch(`${API_BASE_URL}/tweets/${id}/likes/is-liked`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed get isLiked');
  }

  return data;
}
