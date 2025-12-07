import { API_BASE_URL } from '@/shared/constants';

export async function uploadImage(file: File): Promise<{ url: string; key: string } | null> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/images/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
