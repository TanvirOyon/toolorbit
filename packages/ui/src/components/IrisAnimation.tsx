import * as React from 'react';
import { cn } from '../cn.js';

export type IrisState = 'idle' | 'processing' | 'complete' | 'error';

export interface IrisAnimationProps {
  state: IrisState;
  size?: number;
  className?: string;
}

/**
 * The signature ToolOrbit interaction: a ring that closes around content
 * while processing and snaps open with the amber "completion" color when
 * done. Falls back to a plain color swap when prefers-reduced-motion is set
 * (handled entirely in CSS via the .iris-ring class — see global.css).
 */
export function IrisAnimation({ state, size = 28, className }: IrisAnimationProps) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn('iris-ring', className)}
      data-state={state}
      style={{ ['--iris-circumference' as string]: `${circumference}px` }}
      role="status"
      aria-label={
        state === 'processing'
          ? 'Processing'
          : state === 'complete'
            ? 'Done'
            : state === 'error'
              ? 'Error'
              : undefined
      }
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={2}
        className="iris-ring-track"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={circumference}
        className="iris-ring-progress"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}
