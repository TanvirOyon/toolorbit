import * as React from 'react';
import {
  ToolShell,
  ToolShellSection,
  Textarea,
  CopyButton,
  type IrisState,
} from '@toolorbit/ui';

type Mode = 'encode' | 'decode';
type Scope = 'component' | 'full-url';

export default function UrlCodec() {
  const [mode, setMode] = React.useState<Mode>('encode');
  const [scope, setScope] = React.useState<Scope>('component');
  const [input, setInput] = React.useState('');

  const { output, error } = React.useMemo(() => {
    if (!input) return { output: '', error: null as string | null };
    try {
      let result: string;
      if (mode === 'encode') {
        result = scope === 'component' ? encodeURIComponent(input) : encodeURI(input);
      } else {
        result = scope === 'component' ? decodeURIComponent(input) : decodeURI(input);
      }
      return { output: result, error: null };
    } catch {
      return { output: '', error: 'Could not decode — this doesn\u2019t look like valid percent-encoding.' };
    }
  }, [input, mode, scope]);

  const state: IrisState = !input ? 'idle' : error ? 'error' : 'complete';

  return (
    <ToolShell state={state} error={error}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-md bg-base-800 p-1">
          {(['encode', 'decode'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                mode === m ? 'bg-interactive text-base-950' : 'text-base-300 hover:text-base-50'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex gap-1 rounded-md bg-base-800 p-1">
          <button
            type="button"
            onClick={() => setScope('component')}
            className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
              scope === 'component'
                ? 'bg-interactive text-base-950'
                : 'text-base-300 hover:text-base-50'
            }`}
          >
            Component
          </button>
          <button
            type="button"
            onClick={() => setScope('full-url')}
            className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
              scope === 'full-url'
                ? 'bg-interactive text-base-950'
                : 'text-base-300 hover:text-base-50'
            }`}
          >
            Full URL
          </button>
        </div>
      </div>

      <ToolShellSection label="Input">
        <Textarea
          rows={5}
          placeholder={
            mode === 'encode'
              ? 'https://example.com/search?q=hello world & more'
              : 'https%3A%2F%2Fexample.com%2F%3Fq%3Dhello%2520world'
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
      </ToolShellSection>

      <ToolShellSection label="Output" action={<CopyButton value={output} />}>
        <Textarea rows={5} readOnly value={output} placeholder="Result will appear here…" />
      </ToolShellSection>
    </ToolShell>
  );
}
