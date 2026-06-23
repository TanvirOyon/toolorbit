import * as React from 'react';
import { ToolShell, ToolShellSection } from '@toolorbit/ui';
import { Copy, Check } from 'lucide-react';

type Mode = 'chars' | 'words' | 'perWord';

const MODES: { value: Mode; label: string; desc: string }[] = [
  { value: 'chars',   label: 'Reverse characters', desc: '"Hello" → "olleH"'    },
  { value: 'words',   label: 'Reverse word order',  desc: '"A B C" → "C B A"'   },
  { value: 'perWord', label: 'Reverse each word',   desc: '"Hello World" → "olleH dlroW"' },
];

function reverseStr(text: string, mode: Mode): string {
  switch (mode) {
    case 'chars':   return [...text].reverse().join('');
    case 'words':   return text.split(/(\s+)/).reverse().join('');
    case 'perWord': return text.replace(/\S+/g, (w) => [...w].reverse().join(''));
  }
}

export default function StringReverse() {
  const [input, setInput] = React.useState('');
  const [mode, setMode] = React.useState<Mode>('chars');
  const [copied, setCopied] = React.useState(false);
  const output = React.useMemo(() => reverseStr(input, mode), [input, mode]);

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ToolShell state="idle">
      <ToolShellSection label="Reversal mode">
        <div className="space-y-2">
          {MODES.map((m) => (
            <label key={m.value} className="flex items-start gap-3 cursor-pointer rounded-lg border border-base-700 p-3 hover:border-base-500 transition-colors"
              style={{ borderColor: mode === m.value ? 'var(--color-interactive)' : undefined, background: mode === m.value ? 'var(--color-interactive-muted)' : undefined }}>
              <input type="radio" name="mode" value={m.value} checked={mode === m.value} onChange={() => setMode(m.value)} className="mt-0.5 accent-interactive" />
              <div>
                <p className={`text-sm font-medium ${mode === m.value ? 'text-interactive' : 'text-base-200'}`}>{m.label}</p>
                <p className="text-xs text-base-400 font-mono">{m.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </ToolShellSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolShellSection label="Input">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6}
            placeholder="Type or paste text here…"
            className="w-full rounded-lg border border-base-700 bg-base-900 p-3 text-sm text-base-100 placeholder:text-base-500 resize-none focus:outline-none focus:ring-1 focus:ring-interactive" />
        </ToolShellSection>

        <ToolShellSection label="Reversed output"
          action={input ? (
            <button type="button" onClick={copy}
              className="flex items-center gap-1 text-xs text-base-400 hover:text-base-200 transition-colors">
              {copied ? <Check size={12} className="text-completion" /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          ) : undefined}>
          <textarea readOnly value={output} rows={6}
            className="w-full rounded-lg border border-base-700 bg-base-900 p-3 text-sm text-base-200 resize-none focus:outline-none" />
        </ToolShellSection>
      </div>
    </ToolShell>
  );
}
