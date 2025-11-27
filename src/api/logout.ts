import { API_BASE_URL } from '@/shared/constants';

export interface LogoutResponse {
  message: string;
}

export async function logout(): Promise<LogoutResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Logout error');
  }

  return await res.json();
}
