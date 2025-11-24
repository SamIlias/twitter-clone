// client-side function
import { API_BASE_URL } from '@/shared/constants';

export interface LoginValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

export async function loginUser(values: LoginValues): Promise<LoginResponse | null> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Login error');
  }

  return await res.json();
}
