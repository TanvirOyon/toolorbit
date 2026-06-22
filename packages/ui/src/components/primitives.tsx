import * as React from 'react';
import { cn } from '../cn.js';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-base-700 bg-base-900 shadow-sm',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-base-700 bg-base-900 px-3 text-sm text-base-50',
        'placeholder:text-base-400',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive focus-visible:border-interactive',
        'transition-colors duration-150',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex w-full rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 font-mono',
      'placeholder:text-base-400 placeholder:font-sans',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive focus-visible:border-interactive',
      'transition-colors duration-150 resize-y',
      className
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export type BadgeVariant = 'default' | 'interactive' | 'completion' | 'error';

const badgeVariantClasses: Record<BadgeVariant, string> = {
  default: 'bg-base-800 text-base-200 border-base-700',
  interactive: 'bg-interactive-muted text-interactive border-interactive/30',
  completion: 'bg-completion-muted text-completion border-completion/30',
  error: 'bg-error-muted text-error border-error/30',
};

export function Badge({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        badgeVariantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
