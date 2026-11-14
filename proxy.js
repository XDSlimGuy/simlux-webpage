import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: ['/studio/:path*', '/api/studio/:path*'],
};
