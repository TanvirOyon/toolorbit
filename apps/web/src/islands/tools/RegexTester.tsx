import * as React from 'react';
import { ToolShell, ToolShellSection, Textarea, Input, type IrisState } from '@toolorbit/ui';

const FLAGS = [
  { key: 'g', label: 'g', title: 'Global - find all matches' },
  { key: 'i', label: 'i', title: 'Case-insensitive' },
  { key: 'm', label: 'm', title: 'Multiline - ^ and $ match line boundaries' },
  { key: 's', label: 's', title: 'Dot matches newline' },
] as const;

interface MatchResult {
  match: string;
  index: number;
  groups: string[];
  namedGroups: Record<string, string>;
}

export default function RegexTester() {
  const [pattern, setPattern] = React.useState('(\\w+)@(\\w+\\.\\w+)');
  const [flags, setFlags] = React.useState<Set<string>>(new Set(['g']));
  const [sample, setSample] = React.useState('Contact: hello@example.com or support@toolorbit.dev');

  function toggleFlag(flag: string) {
    setFlags((prev) => {
      const next = new Set(prev);
      next.has(flag) ? next.delete(flag) : next.add(flag);
      return next;
    });
  }

  const { matches, error, regex } = React.useMemo(() => {
    if (!pattern) return { matches: [] as MatchResult[], error: null as string | null, regex: null };
    try {
      const re = new RegExp(pattern, Array.from(flags).join(''));
      const results: MatchResult[] = [];

      if (flags.has('g')) {
        for (const m of sample.matchAll(re)) {
          results.push({
            match: m[0],
            index: m.index ?? 0,
            groups: m.slice(1).map((g) => g ?? ''),
            namedGroups: (m.groups as Record<string, string>) ?? {},
          });
        }
      } else {
        const m = re.exec(sample);
        if (m) {
          results.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1).map((g) => g ?? ''),
            namedGroups: (m.groups as Record<string, string>) ?? {},
          });
        }
      }

      return { matches: results, error: null, regex: re };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : 'Invalid pattern', regex: null };
    }
  }, [pattern, flags, sample]);

  const state: IrisState = !pattern ? 'idle' : error ? 'error' : 'complete';

  // Build highlighted segments of the sample text.
  const segments: { text: string; highlighted: boolean }[] = [];
  if (regex && !error) {
    let cursor = 0;
    for (const m of matches) {
      if (m.index > cursor) segments.push({ text: sample.slice(cursor, m.index), highlighted: false });
      segments.push({ text: m.match || ' ', highlighted: true });
      cursor = m.index + (m.match.length || 1);
    }
    if (cursor < sample.length) segments.push({ text: sample.slice(cursor), highlighted: false });
  } else {
    segments.push({ text: sample, highlighted: false });
  }

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection
        label="Pattern"
        action={
          <div className="flex items-center gap-1">
            {FLAGS.map((f) => (
              <button
                key={f.key}
                type="button"
                title={f.title}
                onClick={() => toggleFlag(f.key)}
                className={`h-6 w-6 rounded text-xs font-mono font-bold transition-colors ${
                  flags.has(f.key)
                    ? 'bg-interactive text-base-950'
                    : 'bg-base-800 text-base-400 hover:text-base-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      >
        <div className="flex items-center rounded-md border border-base-700 bg-base-900 px-3 font-mono text-sm text-base-50 focus-within:ring-2 focus-within:ring-interactive">
          <span className="text-base-500">/</span>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="pattern"
            spellCheck={false}
            className="h-10 flex-1 bg-transparent px-1 outline-none"
          />
          <span className="text-base-500">/{Array.from(flags).join('')}</span>
        </div>
      </ToolShellSection>

      <ToolShellSection label="Sample text">
        <Textarea
          rows={5}
          value={sample}
          onChange={(e) => setSample(e.target.value)}
          spellCheck={false}
        />
      </ToolShellSection>

      <ToolShellSection label={`Highlighted matches (${matches.length})`}>
        <div className="whitespace-pre-wrap break-words rounded-md border border-base-700 bg-base-900 p-3 font-mono text-sm leading-relaxed text-base-200">
          {segments.map((seg, i) =>
            seg.highlighted ? (
              <mark key={i} className="rounded bg-interactive-muted text-interactive">
                {seg.text}
              </mark>
            ) : (
              <React.Fragment key={i}>{seg.text}</React.Fragment>
            )
          )}
        </div>
      </ToolShellSection>

      {matches.length > 0 && matches.some((m) => m.groups.length > 0) && (
        <ToolShellSection label="Capture groups">
          <div className="space-y-2">
            {matches.map((m, i) => (
              <div key={i} className="rounded-md border border-base-700 bg-base-900 p-3 text-sm">
                <p className="mb-1 font-mono text-base-400">
                  Match {i + 1}: <span className="text-base-100">{m.match}</span>
                </p>
                {m.groups.map((g, gi) => (
                  <p key={gi} className="ml-3 font-mono text-xs text-base-400">
                    Group {gi + 1}: <span className="text-interactive">{g || '(empty)'}</span>
                  </p>
                ))}
                {Object.entries(m.namedGroups).map(([name, value]) => (
                  <p key={name} className="ml-3 font-mono text-xs text-base-400">
                    {name}: <span className="text-interactive">{value || '(empty)'}</span>
                  </p>
                ))}
              </div>
            ))}
          </div>
        </ToolShellSection>
      )}
    </ToolShell>
  );
}
