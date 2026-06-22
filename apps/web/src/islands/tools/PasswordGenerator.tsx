import * as React from 'react';
import { ToolShell, ToolShellSection, Input, Button, CopyButton, type IrisState } from '@toolorbit/ui';
import { RefreshCw } from 'lucide-react';

const CHARSETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

type CharsetKey = keyof typeof CHARSETS;

function generatePassword(length: number, sets: CharsetKey[]): string {
  const pool = sets.map((s) => CHARSETS[s]).join('');
  if (!pool) return '';
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += pool[randomValues[i] % pool.length];
  }
  return result;
}

function estimateStrength(length: number, sets: CharsetKey[]): { label: string; pct: number; color: string } {
  const poolSize = sets.reduce((acc, s) => acc + CHARSETS[s].length, 0);
  const entropy = poolSize > 0 ? length * Math.log2(poolSize) : 0;
  if (entropy === 0) return { label: 'None', pct: 0, color: 'bg-base-600' };
  if (entropy < 40) return { label: 'Weak', pct: 25, color: 'bg-error' };
  if (entropy < 64) return { label: 'Fair', pct: 50, color: 'bg-completion' };
  if (entropy < 90) return { label: 'Strong', pct: 75, color: 'bg-interactive' };
  return { label: 'Very strong', pct: 100, color: 'bg-completion' };
}

export default function PasswordGenerator() {
  const [length, setLength] = React.useState(20);
  const [sets, setSets] = React.useState<CharsetKey[]>(['lower', 'upper', 'digits']);
  const [password, setPassword] = React.useState(() => generatePassword(20, ['lower', 'upper', 'digits']));

  function toggleSet(key: CharsetKey) {
    setSets((prev) => {
      const next = prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key];
      // Never allow zero charsets — fall back to lowercase rather than
      // silently generating an empty password.
      return next.length > 0 ? next : ['lower'];
    });
  }

  function regenerate(len = length, s = sets) {
    setPassword(generatePassword(len, s));
  }

  React.useEffect(() => {
    regenerate(length, sets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, sets]);

  const strength = estimateStrength(length, sets);
  const state: IrisState = password ? 'complete' : 'idle';

  return (
    <ToolShell state={state}>
      <ToolShellSection label="Generated password" action={<CopyButton value={password} />}>
        <div className="flex items-center gap-2 rounded-md border border-base-700 bg-base-900 px-3 py-3">
          <code className="flex-1 break-all font-mono text-lg text-base-50">{password}</code>
          <Button type="button" variant="ghost" size="icon" onClick={() => regenerate()}>
            <RefreshCw size={16} />
          </Button>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-base-800">
            <div
              className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
              style={{ width: `${strength.pct}%` }}
            />
          </div>
          <span className="text-xs font-medium text-base-400">{strength.label}</span>
        </div>
      </ToolShellSection>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-medium uppercase tracking-wide text-base-400">
            Length
          </label>
          <span className="font-mono text-sm text-base-200">{length}</span>
        </div>
        <input
          type="range"
          min={6}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-interactive"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(
          [
            ['lower', 'a-z'],
            ['upper', 'A-Z'],
            ['digits', '0-9'],
            ['symbols', '!@#$'],
          ] as [CharsetKey, string][]
        ).map(([key, label]) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-2 rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-200"
          >
            <input
              type="checkbox"
              checked={sets.includes(key)}
              onChange={() => toggleSet(key)}
              className="accent-interactive"
            />
            {label}
          </label>
        ))}
      </div>
    </ToolShell>
  );
}
