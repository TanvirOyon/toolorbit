import * as React from 'react';
import { ToolShell, ToolShellSection } from '@toolorbit/ui';

type DiffLine = { type: 'same' | 'add' | 'remove'; text: string };

function diffLines(a: string, b: string): DiffLine[] {
  const aL = a.split('\n'), bL = b.split('\n');
  const m = aL.length, n = bL.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    dp[i][j] = aL[i-1] === bL[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
  const result: DiffLine[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && aL[i-1] === bL[j-1]) { result.unshift({ type: 'same', text: aL[i-1] }); i--; j--; }
    else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) { result.unshift({ type: 'add', text: bL[j-1] }); j--; }
    else { result.unshift({ type: 'remove', text: aL[i-1] }); i--; }
  }
  return result;
}

const ROW_STYLE: Record<DiffLine['type'], string> = {
  same:   'text-base-300',
  add:    'bg-completion/10 text-completion border-l-2 border-completion pl-3',
  remove: 'bg-error/10 text-error border-l-2 border-error pl-3',
};
const PREFIX: Record<DiffLine['type'], string> = { same: '  ', add: '+ ', remove: '- ' };

export default function TextDiff() {
  const [left, setLeft] = React.useState('');
  const [right, setRight] = React.useState('');
  const diff = React.useMemo(() => (left || right) ? diffLines(left, right) : [], [left, right]);
  const added   = diff.filter((d) => d.type === 'add').length;
  const removed = diff.filter((d) => d.type === 'remove').length;
  const same    = diff.filter((d) => d.type === 'same').length;

  return (
    <ToolShell state="idle">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolShellSection label="Original text">
          <textarea value={left} onChange={(e) => setLeft(e.target.value)} rows={8}
            placeholder="Paste the original version here…"
            className="w-full rounded-lg border border-base-700 bg-base-900 p-3 text-sm text-base-100 placeholder:text-base-500 resize-none focus:outline-none focus:ring-1 focus:ring-interactive" />
        </ToolShellSection>
        <ToolShellSection label="Changed text">
          <textarea value={right} onChange={(e) => setRight(e.target.value)} rows={8}
            placeholder="Paste the modified version here…"
            className="w-full rounded-lg border border-base-700 bg-base-900 p-3 text-sm text-base-100 placeholder:text-base-500 resize-none focus:outline-none focus:ring-1 focus:ring-interactive" />
        </ToolShellSection>
      </div>

      {diff.length > 0 && (
        <ToolShellSection label="Diff result">
          <div className="flex gap-4 text-xs mb-2">
            <span className="text-completion">+{added} added</span>
            <span className="text-error">{removed} removed</span>
            <span className="text-base-400">{same} unchanged</span>
          </div>
          <div className="rounded-lg border border-base-700 bg-base-900 overflow-auto max-h-96 font-mono text-xs">
            {diff.map((line, idx) => (
              <div key={idx} className={`flex gap-2 px-3 py-0.5 ${ROW_STYLE[line.type]}`}>
                <span className="shrink-0 select-none opacity-60">{PREFIX[line.type]}</span>
                <span className="whitespace-pre-wrap break-all">{line.text || '\u00a0'}</span>
              </div>
            ))}
          </div>
        </ToolShellSection>
      )}
    </ToolShell>
  );
}
