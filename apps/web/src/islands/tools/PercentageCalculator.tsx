import * as React from 'react';
import { ToolShell, ToolShellSection, Input } from '@toolorbit/ui';

function fmt(n: number) { return isFinite(n) ? parseFloat(n.toPrecision(8)).toLocaleString() : 'Invalid'; }

export default function PercentageCalculator() {
  const [a1, setA1] = React.useState('');
  const [b1, setB1] = React.useState('');
  const [a2, setA2] = React.useState('');
  const [b2, setB2] = React.useState('');
  const [a3, setA3] = React.useState('');
  const [b3, setB3] = React.useState('');
  const [a4, setA4] = React.useState('');
  const [b4, setB4] = React.useState('');

  const r1 = a1 && b1 ? fmt((parseFloat(a1) / 100) * parseFloat(b1)) : '';
  const r2 = a2 && b2 ? (() => { const c = ((parseFloat(b2) - parseFloat(a2)) / parseFloat(a2)) * 100; return `${c >= 0 ? '+' : ''}${fmt(c)}%`; })() : '';
  const r3 = a3 && b3 ? fmt((parseFloat(a3) / parseFloat(b3)) * 100) + '%' : '';
  const r4 = a4 && b4 ? fmt(parseFloat(a4) / (parseFloat(b4) / 100)) : '';

  const cardClass = 'rounded-xl border border-base-700 bg-base-800/50 p-4 space-y-3';
  const inputRow = 'flex items-center gap-2 flex-wrap';
  const label = 'text-xs text-base-400 shrink-0';
  const resultClass = 'mt-1 text-xl font-mono font-bold text-interactive text-center';

  return (
    <ToolShell state="idle">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={cardClass}>
          <p className="text-sm font-medium text-base-200">What is X% of Y?</p>
          <div className={inputRow}>
            <Input value={a1} onChange={(e) => setA1(e.target.value)} placeholder="X" className="w-20" type="number" />
            <span className={label}>% of</span>
            <Input value={b1} onChange={(e) => setB1(e.target.value)} placeholder="Y" className="w-20" type="number" />
          </div>
          {r1 && <p className={resultClass}>= {r1}</p>}
        </div>

        <div className={cardClass}>
          <p className="text-sm font-medium text-base-200">Percentage change from A to B</p>
          <div className={inputRow}>
            <span className={label}>From</span>
            <Input value={a2} onChange={(e) => setA2(e.target.value)} placeholder="A" className="w-20" type="number" />
            <span className={label}>to</span>
            <Input value={b2} onChange={(e) => setB2(e.target.value)} placeholder="B" className="w-20" type="number" />
          </div>
          {r2 && <p className={resultClass}>{r2}</p>}
        </div>

        <div className={cardClass}>
          <p className="text-sm font-medium text-base-200">What percent is X of Y?</p>
          <div className={inputRow}>
            <Input value={a3} onChange={(e) => setA3(e.target.value)} placeholder="X" className="w-20" type="number" />
            <span className={label}>is what % of</span>
            <Input value={b3} onChange={(e) => setB3(e.target.value)} placeholder="Y" className="w-20" type="number" />
          </div>
          {r3 && <p className={resultClass}>{r3}</p>}
        </div>

        <div className={cardClass}>
          <p className="text-sm font-medium text-base-200">X is P% of what number?</p>
          <div className={inputRow}>
            <Input value={a4} onChange={(e) => setA4(e.target.value)} placeholder="X" className="w-20" type="number" />
            <span className={label}>is</span>
            <Input value={b4} onChange={(e) => setB4(e.target.value)} placeholder="P" className="w-16" type="number" />
            <span className={label}>% of ?</span>
          </div>
          {r4 && <p className={resultClass}>= {r4}</p>}
        </div>
      </div>
    </ToolShell>
  );
}
