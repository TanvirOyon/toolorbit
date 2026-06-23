import * as React from 'react';
import { ToolShell } from '@toolorbit/ui';
import { Delete } from 'lucide-react';

interface HistoryEntry { expr: string; result: string }

const BUTTONS: string[][] = [
  ['sin(',  'cos(',  'tan(',  'sqrt(', 'π',   'e'   ],
  ['asin(', 'acos(', 'atan(', '^',    'log(', 'ln(' ],
  ['(',     ')',     '%',     '!',    'abs(', 'DEL' ],
  ['7',     '8',     '9',     '/',    'AC',   ''    ],
  ['4',     '5',     '6',     '*',    '',     ''    ],
  ['1',     '2',     '3',     '-',    '=',    ''    ],
  ['0',     '00',    '.',     '+',    '',     ''    ],
];

async function evaluate(expr: string): Promise<string> {
  try {
    const { evaluate: ev } = await import('mathjs');
    const result = ev(expr.replace(/π/g, 'pi').replace(/\^/g, '^'));
    if (typeof result === 'number') {
      if (!isFinite(result)) return 'Error';
      return Number.isInteger(result) ? result.toString() : parseFloat(result.toPrecision(12)).toString();
    }
    return result.toString();
  } catch {
    return 'Error';
  }
}

const BTN_CLASS: Record<string, string> = {
  '=': 'bg-interactive text-white hover:bg-interactive-hover',
  'AC': 'bg-base-700 text-base-100 hover:bg-base-600',
  'DEL': 'bg-base-700 text-base-100 hover:bg-base-600',
};

export default function ScientificCalculator() {
  const [expr, setExpr] = React.useState('');
  const [history, setHistory] = React.useState<HistoryEntry[]>([]);
  const [loading, setLoading] = React.useState(false);

  async function handleButton(btn: string) {
    if (!btn) return;
    if (btn === 'AC') { setExpr(''); return; }
    if (btn === 'DEL') { setExpr((p) => p.slice(0, -1)); return; }
    if (btn === '=') {
      if (!expr.trim()) return;
      setLoading(true);
      const result = await evaluate(expr);
      setHistory((p) => [{ expr, result }, ...p.slice(0, 9)]);
      setExpr(result === 'Error' ? '' : result);
      setLoading(false);
      return;
    }
    if (btn === 'π') { setExpr((p) => p + 'π'); return; }
    setExpr((p) => p + btn);
  }

  async function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') { e.preventDefault(); handleButton('='); }
    if (e.key === 'Escape') setExpr('');
  }

  return (
    <ToolShell state={loading ? 'processing' : 'idle'}>
      <div className="rounded-xl border border-base-700 bg-base-900 overflow-hidden">
        {history.length > 0 && (
          <div className="px-4 py-2 border-b border-base-800 max-h-24 overflow-y-auto space-y-0.5">
            {history.map((h, i) => (
              <button key={i} type="button" onClick={() => setExpr(h.result)}
                className="flex w-full justify-between text-xs font-mono text-base-500 hover:text-base-300 transition-colors">
                <span className="truncate">{h.expr}</span>
                <span className="ml-2 text-base-400">= {h.result}</span>
              </button>
            ))}
          </div>
        )}

        <input
          type="text"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="0"
          className="w-full bg-transparent px-4 py-3 text-right text-2xl font-mono text-base-50 placeholder:text-base-600 focus:outline-none border-b border-base-800"
        />

        <div className="p-3 grid gap-1.5" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
          {BUTTONS.flat().map((btn, idx) => {
            if (!btn) return <div key={idx} />;
            const isEq = btn === '=';
            const base = BTN_CLASS[btn] || 'bg-base-800 text-base-200 hover:bg-base-700';
            return (
              <button key={idx} type="button" onClick={() => handleButton(btn)}
                className={`rounded-lg py-2.5 text-sm font-medium transition-colors font-mono ${base} ${isEq ? 'row-span-2' : ''}`}
                style={isEq ? { gridRow: 'span 2' } : undefined}>
                {btn === 'DEL' ? <Delete size={14} className="mx-auto" /> : btn}
              </button>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-base-500 text-center">Type expressions directly or use buttons. Press Enter to evaluate.</p>
    </ToolShell>
  );
}
