import * as React from 'react';
import { Card } from './primitives.js';
import { IrisAnimation, type IrisState } from './IrisAnimation.js';
import { cn } from '../cn.js';

export interface ToolShellProps {
  state?: IrisState;
  children: React.ReactNode;
  error?: string | null;
  className?: string;
  /**
   * Tool slug for usage tracking. If omitted the shell reads it from the URL
   * path (/tools/<slug>) automatically - so most islands don't need to pass it.
   */
  slug?: string;
}

export function ToolShell({ state = 'idle', children, error, className, slug }: ToolShellProps) {
  React.useEffect(() => {
    // Auto-detect slug from /tools/<slug> if not explicitly provided
    const effectiveSlug =
      slug ??
      (typeof window !== 'undefined'
        ? window.location.pathname.match(/\/tools\/([^/]+)/)?.[1]
        : undefined);

    if (!effectiveSlug) return;

    fetch('/api/usage', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: effectiveSlug }),
    }).catch(() => { /* silent - anonymous users get 401, that's fine */ });
  }, [slug]);

  return (
    <Card className={cn('p-4 sm:p-6 space-y-4', className)}>
      <div className="flex items-center justify-end">
        <IrisAnimation state={state} size={24} />
      </div>

      {error ? (
        <div
          role="alert"
          className="rounded-md border border-error/30 bg-error-muted px-3 py-2 text-sm text-error"
        >
          {error}
        </div>
      ) : null}

      <div className="space-y-4">{children}</div>
    </Card>
  );
}

export function ToolShellSection({
  label,
  action,
  children,
}: {
  label: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-wide text-base-400">
          {label}
        </label>
        {action}
      </div>
      {children}
    </div>
  );
}
