import * as React from 'react';
import { ToolShell, ToolShellSection, Button } from '@toolorbit/ui';
import { Copy, Check } from 'lucide-react';

export default function DuplicateLineRemover() {
  const [input, setInput] = React.useState('');
  const [caseInsensitive, setCaseInsensitive] = React.useState(false);
  const [keepLast, setKeepLast] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const { output, removed } = React.useMemo(() => {
    if (!input.trim()) return { output: '', removed: 0 };
    const lines = input.split('\n');
    const seen = new Map<string, number>();
    lines.forEach((line, idx) => { const key = caseInsensitive ? line.toLowerCase() : line; seen.set(key, idx); });
    const uniqueIndices = new Set(seen.values());
    const result = keepLast
      ? lines.filter((_, idx) => { const key = caseInsensitive ? lines[idx].toLowerCase() : lines[idx]; return seen.get(key) === idx; })
      : (() => { const s = new Set<string>(); return lines.filter((line) => { const k = caseInsensitive ? line.toLowerCase() : line; if (s.has(k)) return false; s.add(k); return true; }); })();
    return { output: result.join('\n'), removed: lines.length - result.length };
  }, [input, caseInsensitive, keepLast]);

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ToolShell state="idle">
      <div className="flex gap-4 flex-wrap">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={caseInsensitive} onChange={(e) => setCaseInsensitive(e.target.checked)} className="accent-interactive" />
          <span className="text-sm text-base-300">Case-insensitive matching</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={keepLast} onChange={(e) => setKeepLast(e.target.checked)} className="accent-interactive" />
          <span className="text-sm text-base-300">Keep last occurrence</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolShellSection label="Input">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={12}
            placeholder="Paste lines here - duplicates are removed in real time…"
            className="w-full rounded-lg border border-base-700 bg-base-900 p-3 text-sm text-base-100 placeholder:text-base-500 resize-none focus:outline-none focus:ring-1 focus:ring-interactive" />
          <p className="mt-1 text-xs text-base-400">{input.split('\n').length} lines</p>
        </ToolShellSection>

        <ToolShellSection label={`Output${removed > 0 ? ` - ${removed} duplicate${removed !== 1 ? 's' : ''} removed` : ''}`}
          action={output ? (
            <button type="button" onClick={copy}
              className="flex items-center gap-1 text-xs text-base-400 hover:text-base-200 transition-colors">
              {copied ? <Check size={12} className="text-completion" /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          ) : undefined}>
          <textarea readOnly value={output} rows={12}
            className="w-full rounded-lg border border-base-700 bg-base-900 p-3 text-sm text-base-200 resize-none focus:outline-none" />
          <p className="mt-1 text-xs text-base-400">{output ? output.split('\n').length : 0} unique lines</p>
        </ToolShellSection>
      </div>
    </ToolShell>
  );
}
