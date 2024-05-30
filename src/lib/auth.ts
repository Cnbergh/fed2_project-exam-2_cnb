import { getSession } from 'next-auth/react';

export async function getUser() {
  const session = await getSession();
  if (!session || !session.user) {
    throw new Error('User is not authenticated');
  }
  return session.user;
}
