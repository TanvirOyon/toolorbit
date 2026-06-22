import * as React from 'react';
import {
  ToolShell,
  ToolShellSection,
  Textarea,
  Button,
  CopyButton,
  Badge,
  type IrisState,
} from '@toolorbit/ui';

type IndentOption = '2' | '4' | 'tab';

export default function JsonFormatter() {
  const [input, setInput] = React.useState('');
  const [indent, setIndent] = React.useState<IndentOption>('2');

  const { output, error } = React.useMemo(() => {
    if (!input.trim()) return { output: '', error: null as string | null };
    try {
      const parsed = JSON.parse(input);
      const space = indent === 'tab' ? '\t' : Number(indent);
      return { output: JSON.stringify(parsed, null, space), error: null };
    } catch (e) {
      return { output: '', error: e instanceof Error ? e.message : 'Invalid JSON' };
    }
  }, [input, indent]);

  const state: IrisState = !input.trim() ? 'idle' : error ? 'error' : 'complete';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection
        label="Input"
        action={
          <div className="flex items-center gap-1">
            {(['2', '4', 'tab'] as IndentOption[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setIndent(opt)}
                className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                  indent === opt
                    ? 'bg-interactive-muted text-interactive'
                    : 'text-base-400 hover:text-base-200'
                }`}
              >
                {opt === 'tab' ? 'Tab' : `${opt} spaces`}
              </button>
            ))}
          </div>
        }
      >
        <Textarea
          rows={10}
          placeholder={'{"hello": "world", "nested": {"array": [1, 2, 3]}}'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
      </ToolShellSection>

      <ToolShellSection
        label="Formatted output"
        action={
          <div className="flex items-center gap-2">
            {output && <Badge variant="completion">Valid JSON</Badge>}
            <CopyButton value={output} />
          </div>
        }
      >
        <Textarea
          rows={10}
          readOnly
          value={output}
          placeholder="Formatted JSON will appear here…"
        />
      </ToolShellSection>

      <div className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setInput('')}
          disabled={!input}
        >
          Clear
        </Button>
      </div>
    </ToolShell>
  );
}
