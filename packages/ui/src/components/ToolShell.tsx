import * as React from 'react';
import { Card } from './primitives.js';
import { IrisAnimation, type IrisState } from './IrisAnimation.js';
import { cn } from '../cn.js';

export interface ToolShellProps {
  /** Optional small status indicator shown top-right (the iris ring). */
  state?: IrisState;
  /** The input controls (textarea, file drop zone, option toggles, etc). */
  children: React.ReactNode;
  /** Optional error string rendered in the error-tinted banner. */
  error?: string | null;
  className?: string;
}

/**
 * Every tool island in ToolOrbit renders inside ToolShell, so the visual
 * "container" — card surface, border, the iris status ring, and error
 * banner — is consistent across all ~500 future tools without each one
 * re-implementing it.
 */
export function ToolShell({ state = 'idle', children, error, className }: ToolShellProps) {
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
