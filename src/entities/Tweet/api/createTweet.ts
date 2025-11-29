'use client';

import { Tweet } from '@/entities/Tweet/model/types';
import { API_BASE_URL } from '@/shared/constants';

export interface CreateTweetPayload {
  textContent: string;
  image?: string;
}

export async function createTweet(payload: CreateTweetPayload): Promise<Tweet | null> {
  const response = await fetch(`${API_BASE_URL}/tweets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create tweet');
  }

  return data;
}
