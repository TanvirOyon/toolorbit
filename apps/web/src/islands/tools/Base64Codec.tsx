import * as React from 'react';
import {
  ToolShell,
  ToolShellSection,
  Textarea,
  CopyButton,
  type IrisState,
} from '@toolorbit/ui';

type Mode = 'encode' | 'decode';

function utf8ToBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToUtf8(input: string): string {
  const binary = atob(input);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}

export default function Base64Codec() {
  const [mode, setMode] = React.useState<Mode>('encode');
  const [input, setInput] = React.useState('');

  const { output, error } = React.useMemo(() => {
    if (!input) return { output: '', error: null as string | null };
    try {
      const result = mode === 'encode' ? utf8ToBase64(input) : base64ToUtf8(input);
      return { output: result, error: null };
    } catch {
      return {
        output: '',
        error:
          mode === 'decode'
            ? 'Input is not valid Base64.'
            : 'Could not encode this input.',
      };
    }
  }, [input, mode]);

  const state: IrisState = !input ? 'idle' : error ? 'error' : 'complete';

  function switchMode(next: Mode) {
    setMode(next);
    // Swap input/output so toggling direction feels natural rather than
    // clearing your work.
    setInput(output || '');
  }

  return (
    <ToolShell state={state} error={error}>
      <div className="flex gap-1 rounded-md bg-base-800 p-1">
        {(['encode', 'decode'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={`flex-1 rounded px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              mode === m ? 'bg-interactive text-base-950' : 'text-base-300 hover:text-base-50'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <ToolShellSection label={mode === 'encode' ? 'Plain text' : 'Base64'}>
        <Textarea
          rows={6}
          placeholder={mode === 'encode' ? 'Type or paste text…' : 'Paste a Base64 string…'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
      </ToolShellSection>

      <ToolShellSection
        label={mode === 'encode' ? 'Base64' : 'Decoded text'}
        action={<CopyButton value={output} />}
      >
        <Textarea rows={6} readOnly value={output} placeholder="Result will appear here…" />
      </ToolShellSection>
    </ToolShell>
  );
}
