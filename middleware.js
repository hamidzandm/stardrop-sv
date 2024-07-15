export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/characters/add', '/profile', '/characters/saved', '/messages'],
};