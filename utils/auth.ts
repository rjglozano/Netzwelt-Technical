import { NextRequest } from 'next/server';

export interface CustomRequest extends NextRequest {
  session?: {
    user?: string;
    sessionId?: string;
  };
}

export function isAuthenticated(req: CustomRequest): { authenticated: boolean; sessionId?: string } {
  const session = req.session;

  console.log('Session:', session);

  if (session && session.user && session.sessionId) {
    return { authenticated: true, sessionId: session.sessionId };
  } else {
    return { authenticated: false, sessionId: undefined };
  }
}
