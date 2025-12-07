export interface Tweet {
  id: number;
  userId: number;
  textContent: string;
  createdAt: string;
  images?: string[] | null;
}
