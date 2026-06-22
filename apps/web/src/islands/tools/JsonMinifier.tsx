import * as React from 'react';
import {
  ToolShell,
  ToolShellSection,
  Textarea,
  CopyButton,
  Badge,
  type IrisState,
} from '@toolorbit/ui';

function byteSize(str: string): number {
  return new TextEncoder().encode(str).length;
}

export default function JsonMinifier() {
  const [input, setInput] = React.useState('');

  const { output, error } = React.useMemo(() => {
    if (!input.trim()) return { output: '', error: null as string | null };
    try {
      const parsed = JSON.parse(input);
      return { output: JSON.stringify(parsed), error: null };
    } catch (e) {
      return { output: '', error: e instanceof Error ? e.message : 'Invalid JSON' };
    }
  }, [input]);

  const state: IrisState = !input.trim() ? 'idle' : error ? 'error' : 'complete';

  const savings = React.useMemo(() => {
    if (!output) return null;
    const before = byteSize(input);
    const after = byteSize(output);
    const pct = before > 0 ? Math.round((1 - after / before) * 100) : 0;
    return { before, after, pct };
  }, [input, output]);

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="Input">
        <Textarea
          rows={10}
          placeholder={'{\n  "hello": "world"\n}'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
      </ToolShellSection>

      <ToolShellSection
        label="Minified output"
        action={
          <div className="flex items-center gap-2">
            {savings && (
              <Badge variant="completion">
                {savings.before}B → {savings.after}B ({savings.pct}% smaller)
              </Badge>
            )}
            <CopyButton value={output} />
          </div>
        }
      >
        <Textarea rows={6} readOnly value={output} placeholder="Minified JSON will appear here…" />
      </ToolShellSection>
    </ToolShell>
  );
}
