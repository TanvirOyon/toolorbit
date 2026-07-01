import * as React from 'react';
import { ToolShell, ToolShellSection } from '@toolorbit/ui';
import { Copy, Check } from 'lucide-react';

interface Opts {
  trimLeading: boolean; trimTrailing: boolean; normalizeInternal: boolean;
  removeBlankLines: boolean; removeAll: boolean; tabsToSpaces: boolean;
}

function clean(text: string, opts: Opts): string {
  if (opts.removeAll) return text.replace(/\s+/g, '');
  let lines = text.split('\n');
  if (opts.trimLeading) lines = lines.map((l) => l.replace(/^\s+/, ''));
  if (opts.trimTrailing) lines = lines.map((l) => l.replace(/\s+$/, ''));
  if (opts.normalizeInternal) lines = lines.map((l) => l.replace(/[ \t]+/g, ' '));
  if (opts.tabsToSpaces) lines = lines.map((l) => l.replace(/\t/g, '  '));
  if (opts.removeBlankLines) lines = lines.filter((l) => l.trim() !== '');
  return lines.join('\n');
}

const OPTIONS: { key: keyof Opts; label: string }[] = [
  { key: 'trimLeading',       label: 'Trim leading spaces per line'          },
  { key: 'trimTrailing',      label: 'Trim trailing spaces per line'         },
  { key: 'normalizeInternal', label: 'Normalize internal whitespace (→ 1 space)'},
  { key: 'removeBlankLines',  label: 'Remove blank lines'                    },
  { key: 'tabsToSpaces',      label: 'Convert tabs to 2 spaces'              },
  { key: 'removeAll',         label: 'Remove ALL whitespace'                 },
];

export default function WhitespaceRemover() {
  const [input, setInput] = React.useState('');
  const [opts, setOpts] = React.useState<Opts>({
    trimLeading: true, trimTrailing: true, normalizeInternal: false,
    removeBlankLines: false, removeAll: false, tabsToSpaces: false,
  });
  const [copied, setCopied] = React.useState(false);

  const output = React.useMemo(() => clean(input, opts), [input, opts]);
  const charsSaved = input.length - output.length;

  function toggle(key: keyof Opts) {
    setOpts((prev) => ({
      ...prev,
      [key]: !prev[key],
      ...(key === 'removeAll' && !prev.removeAll ? { trimLeading: false, trimTrailing: false, normalizeInternal: false, removeBlankLines: false, tabsToSpaces: false } : {}),
    }));
  }

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ToolShell state="idle">
      <ToolShellSection label="Options">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {OPTIONS.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={opts[key]}
                onChange={() => toggle(key)}
                disabled={key !== 'removeAll' && opts.removeAll}
                className="accent-interactive" />
              <span className={`text-sm ${key !== 'removeAll' && opts.removeAll ? 'text-base-600' : 'text-base-300'}`}>{label}</span>
            </label>
          ))}
        </div>
      </ToolShellSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolShellSection label="Input">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10}
            placeholder="Paste text with extra whitespace here…"
            className="w-full rounded-lg border border-base-700 bg-base-900 p-3 text-sm text-base-100 placeholder:text-base-500 resize-none focus:outline-none focus:ring-1 focus:ring-interactive" />
        </ToolShellSection>
        <ToolShellSection label={`Output${charsSaved > 0 ? ` - ${charsSaved} chars removed` : ''}`}
          action={output ? (
            <button type="button" onClick={copy}
              className="flex items-center gap-1 text-xs text-base-400 hover:text-base-200 transition-colors">
              {copied ? <Check size={12} className="text-completion" /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          ) : undefined}>
          <textarea readOnly value={output} rows={10}
            className="w-full rounded-lg border border-base-700 bg-base-900 p-3 text-sm text-base-200 resize-none focus:outline-none" />
        </ToolShellSection>
      </div>
    </ToolShell>
  );
}
