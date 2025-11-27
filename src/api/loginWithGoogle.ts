import { API_BASE_URL } from '@/shared/constants';

export async function loginWithGoogle(): Promise<void> {
  window.location.href = `${API_BASE_URL}/auth/google`;
}
