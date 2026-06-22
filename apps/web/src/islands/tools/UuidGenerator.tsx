import * as React from 'react';
import {
  ToolShell,
  ToolShellSection,
  Textarea,
  Input,
  Button,
  CopyButton,
  type IrisState,
} from '@toolorbit/ui';
import { RefreshCw } from 'lucide-react';

export default function UuidGenerator() {
  const [count, setCount] = React.useState(1);
  const [uuids, setUuids] = React.useState<string[]>(() => [crypto.randomUUID()]);

  function generate(n: number) {
    const clamped = Math.min(Math.max(n, 1), 100);
    setUuids(Array.from({ length: clamped }, () => crypto.randomUUID()));
  }

  const output = uuids.join('\n');
  const state: IrisState = uuids.length > 0 ? 'complete' : 'idle';

  return (
    <ToolShell state={state}>
      <div className="flex flex-wrap items-end gap-3">
        <div className="w-32">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-base-400">
            Count
          </label>
          <Input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>
        <Button type="button" onClick={() => generate(count)}>
          <RefreshCw size={15} />
          Generate {count > 1 ? `${count} UUIDs` : 'UUID'}
        </Button>
      </div>

      <ToolShellSection
        label={`Result${uuids.length > 1 ? 's' : ''}`}
        action={<CopyButton value={output} label={uuids.length > 1 ? 'Copy all' : 'Copy'} />}
      >
        <Textarea
          rows={Math.min(Math.max(uuids.length, 3), 14)}
          readOnly
          value={output}
          className="font-mono"
        />
      </ToolShellSection>
    </ToolShell>
  );
}
