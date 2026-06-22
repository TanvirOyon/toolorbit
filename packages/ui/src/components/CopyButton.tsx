import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from './Button.js';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard.js';

export function CopyButton({ value, label = 'Copy' }: { value: string; label?: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={() => copy(value)}
      disabled={!value}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Copied' : label}
    </Button>
  );
}
