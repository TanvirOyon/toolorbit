import * as React from 'react';
import { ToolShell, ToolShellSection, Input } from '@toolorbit/ui';

type Mode = 'diff' | 'add';

function calcDiff(a: Date, b: Date, excludeWeekends: boolean) {
  const start = a < b ? a : b;
  const end = a < b ? b : a;
  const ms = end.getTime() - start.getTime();
  const totalDays = Math.round(ms / 86400000);
  let businessDays = 0;
  if (excludeWeekends) {
    const cur = new Date(start);
    while (cur < end) { const d = cur.getDay(); if (d !== 0 && d !== 6) businessDays++; cur.setDate(cur.getDate() + 1); }
  }
  const weeks = Math.floor(totalDays / 7);
  const remDays = totalDays % 7;
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  if (months < 0) { years--; months += 12; }
  return { totalDays, businessDays, weeks, remDays, years, months };
}

export default function DateDiffCalculator() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [mode, setMode] = React.useState<Mode>('diff');
  const [date1, setDate1] = React.useState(todayStr);
  const [date2, setDate2] = React.useState('');
  const [excludeWeekends, setExcludeWeekends] = React.useState(false);
  const [addBase, setAddBase] = React.useState(todayStr);
  const [addDays, setAddDays] = React.useState('');
  const [addSubtract, setAddSubtract] = React.useState<'add' | 'subtract'>('add');

  const diffResult = React.useMemo(() => {
    if (mode !== 'diff' || !date1 || !date2) return null;
    const a = new Date(date1 + 'T00:00:00'), b = new Date(date2 + 'T00:00:00');
    if (isNaN(a.getTime()) || isNaN(b.getTime()) || a.getTime() === b.getTime()) return null;
    return calcDiff(a, b, excludeWeekends);
  }, [mode, date1, date2, excludeWeekends]);

  const addResult = React.useMemo(() => {
    if (mode !== 'add' || !addBase || !addDays) return null;
    const base = new Date(addBase + 'T00:00:00');
    const d = parseInt(addDays, 10);
    if (isNaN(base.getTime()) || isNaN(d)) return null;
    const result = new Date(base);
    result.setDate(result.getDate() + (addSubtract === 'add' ? d : -d));
    return result.toDateString();
  }, [mode, addBase, addDays, addSubtract]);

  return (
    <ToolShell state="idle">
      <div className="flex gap-2">
        {(['diff', 'add'] as Mode[]).map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)}
            className={`flex-1 rounded-md border py-2 text-sm font-medium transition-colors ${mode === m ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
            {m === 'diff' ? 'Date Difference' : 'Add / Subtract Days'}
          </button>
        ))}
      </div>

      {mode === 'diff' ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <ToolShellSection label="Start date">
              <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)}
                className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 focus:outline-none focus:ring-1 focus:ring-interactive" />
            </ToolShellSection>
            <ToolShellSection label="End date">
              <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)}
                className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 focus:outline-none focus:ring-1 focus:ring-interactive" />
            </ToolShellSection>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={excludeWeekends} onChange={(e) => setExcludeWeekends(e.target.checked)} className="accent-interactive" />
            <span className="text-sm text-base-300">Exclude weekends (business days only)</span>
          </label>
          {diffResult && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              {[
                ['Total days', diffResult.totalDays.toLocaleString()],
                ['Weeks + days', `${diffResult.weeks}w ${diffResult.remDays}d`],
                ['Years + months', `${diffResult.years}y ${diffResult.months}m`],
                ...(excludeWeekends ? [['Business days', diffResult.businessDays.toLocaleString()]] : []),
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-base-700 bg-base-800/50 p-3">
                  <p className="text-xs text-base-400 mb-1">{label}</p>
                  <p className="text-lg font-mono font-bold text-base-100">{value}</p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <ToolShellSection label="Start date">
              <input type="date" value={addBase} onChange={(e) => setAddBase(e.target.value)}
                className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 focus:outline-none focus:ring-1 focus:ring-interactive" />
            </ToolShellSection>
            <ToolShellSection label="Days">
              <Input value={addDays} onChange={(e) => setAddDays(e.target.value)} placeholder="30" type="number" />
            </ToolShellSection>
          </div>
          <div className="flex gap-2">
            {(['add', 'subtract'] as const).map((op) => (
              <button key={op} type="button" onClick={() => setAddSubtract(op)}
                className={`flex-1 rounded-md border py-2 text-sm font-medium capitalize transition-colors ${addSubtract === op ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
                {op === 'add' ? '+ Add days' : '- Subtract days'}
              </button>
            ))}
          </div>
          {addResult && (
            <div className="rounded-xl border border-base-700 bg-base-800/50 p-5 text-center">
              <p className="text-xs text-base-400 uppercase tracking-wide mb-2">Result date</p>
              <p className="text-2xl font-mono font-bold text-interactive">{addResult}</p>
            </div>
          )}
        </>
      )}
    </ToolShell>
  );
}
