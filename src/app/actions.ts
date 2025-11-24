'use server';

export async function getUsers() {
  const res = await fetch('http://localhost:3001', { cache: 'no-store' });
  return res.json();
}
