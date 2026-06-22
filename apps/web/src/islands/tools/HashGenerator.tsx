import * as React from 'react';
import { md5 } from '../../lib/md5';
import { ToolShell, ToolShellSection, Textarea, Input, CopyButton, type IrisState } from '@toolorbit/ui';

const ALGORITHMS = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'] as const;
type Algorithm = (typeof ALGORITHMS)[number];

async function sha(input: string, algo: 'SHA-1' | 'SHA-256' | 'SHA-512'): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest(algo, bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function computeHash(input: string, algo: Algorithm): Promise<string> {
  if (algo === 'MD5') return md5(input);
  return sha(input, algo);
}

export default function HashGenerator() {
  const [input, setInput] = React.useState('');
  const [hashes, setHashes] = React.useState<Record<Algorithm, string>>({
    MD5: '',
    'SHA-1': '',
    'SHA-256': '',
    'SHA-512': '',
  });
  const [state, setState] = React.useState<IrisState>('idle');

  React.useEffect(() => {
    let cancelled = false;

    if (!input) {
      setHashes({ MD5: '', 'SHA-1': '', 'SHA-256': '', 'SHA-512': '' });
      setState('idle');
      return;
    }

    setState('processing');
    Promise.all(ALGORITHMS.map((algo) => computeHash(input, algo))).then((results) => {
      if (cancelled) return;
      const next = Object.fromEntries(
        ALGORITHMS.map((algo, i) => [algo, results[i]])
      ) as Record<Algorithm, string>;
      setHashes(next);
      setState('complete');
    });

    return () => {
      cancelled = true;
    };
  }, [input]);

  return (
    <ToolShell state={state}>
      <ToolShellSection label="Input text">
        <Input
          placeholder="Type or paste text to hash…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
      </ToolShellSection>

      <div className="space-y-3">
        {ALGORITHMS.map((algo) => (
          <ToolShellSection key={algo} label={algo} action={<CopyButton value={hashes[algo]} />}>
            <Textarea
              rows={algo === 'SHA-512' ? 2 : 1}
              readOnly
              value={hashes[algo]}
              placeholder="—"
              className="resize-none"
            />
          </ToolShellSection>
        ))}
      </div>
    </ToolShell>
  );
}
