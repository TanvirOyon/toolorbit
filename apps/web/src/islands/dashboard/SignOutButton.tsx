import * as React from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from '../../lib/auth-client';

/**
 * A button that calls Better Auth's POST /api/auth/sign-out endpoint,
 * then redirects to the homepage. Must be a React island because sign-out
 * requires a POST request - a plain <a href> only sends GET.
 */
export default function SignOutButton() {
  const [loading, setLoading] = React.useState(false);

  async function handleSignOut() {
    setLoading(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/';
        },
        onError: () => {
          // Even on error, clear the page so the user isn't stuck
          window.location.href = '/';
        },
      },
    });
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="flex items-center gap-1.5 text-sm text-base-400 transition-colors hover:text-base-200 disabled:opacity-50"
      aria-label="Sign out of ToolOrbit"
    >
      <LogOut size={14} aria-hidden="true" />
      {loading ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
