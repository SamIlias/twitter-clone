export interface Tweet {
  id: number;
  userId: number;
  textContent: string;
  createdAt: string;
  image?: string | null;
  likes: number;
}
