import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { TokenPayload } from '@/types/auth';
import { LRUCache } from 'lru-cache';

// Token cache configuration
const tokenCache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60 * 5, // 5 minutes
});

// Role-based access configuration
const ROLE_PATH_MAP = {
  public: ['/public'],
  admin: ['/admin'],
  government: ['/government'],
  registry: ['/registry'],
} as const;

const validateRoleAccess = (role: string, path: string): boolean => {
  const allowedPaths = ROLE_PATH_MAP[role as keyof typeof ROLE_PATH_MAP] || [];
  return allowedPaths.some(allowedPath => path.startsWith(allowedPath));
};

export default withAuth(
  async function middleware(req: NextRequest) {
    try {
      const session = (await getToken({ req })) as TokenPayload | null;
      
      if (!session?.accesstokens) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Check cache first
      const cachedData = tokenCache.get(session.accesstokens);
      const userData = cachedData || session.userdata;
      
      if (!userData?.role) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Cache the user data if it wasn't in cache
      if (!cachedData) {
        tokenCache.set(session.accesstokens, userData);
      }

      const basePath = req.nextUrl.pathname.split('/')[1];
      if (!validateRoleAccess(userData.role, `/${basePath}`)) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      return NextResponse.next();
    } catch (error) {
      // Log error to monitoring service (e.g., Sentry)
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: '/login/' },
  }
);

export const config = {
  matcher: [
    '/public/:path*',
    '/admin/:path*',
    '/government/:path*',
    '/registry/:path*',
  ],
};