import { createAuthClient } from 'better-auth/client';

/**
 * Client-side auth helper.
 * Import this in React islands to get signIn, signOut, useSession, etc.
 *
 * Example:
 *   import { authClient } from '../../lib/auth-client';
 *   const { data: session } = authClient.useSession();
 *   await authClient.signIn.social({ provider: 'google' });
 */
export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : '',
});

export const { signIn, signOut, useSession } = authClient;
