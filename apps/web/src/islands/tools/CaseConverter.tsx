import * as React from 'react';
import { ToolShell, ToolShellSection, Button } from '@toolorbit/ui';
import { Copy, Check } from 'lucide-react';

type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab';

const SMALL_WORDS = new Set(['a','an','the','and','but','or','for','nor','on','at','to','by','in','of','up','as','is','it']);

export function convert(text: string, type: CaseType): string {
  switch (type) {
    case 'upper': return text.toUpperCase();
    case 'lower': return text.toLowerCase();
    case 'title': return text.toLowerCase().replace(/\b\w+/g, (w, i) => (i === 0 || !SMALL_WORDS.has(w)) ? w[0].toUpperCase() + w.slice(1) : w);
    case 'sentence': return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    case 'camel': {
      const words = text.trim().split(/[\s_\-]+/);
      return words[0].toLowerCase() + words.slice(1).map((w) => w[0]?.toUpperCase() + w.slice(1).toLowerCase()).join('');
    }
    case 'pascal': return text.trim().split(/[\s_\-]+/).map((w) => w[0]?.toUpperCase() + w.slice(1).toLowerCase()).join('');
    case 'snake': return text.trim().toLowerCase().replace(/[\s\-]+/g, '_').replace(/[^\w]/g, '');
    case 'kebab': return text.trim().toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w\-]/g, '');
  }
}

const CASES: { value: CaseType; label: string; example: string }[] = [
  { value: 'upper',    label: 'UPPERCASE',    example: 'HELLO WORLD'   },
  { value: 'lower',    label: 'lowercase',    example: 'hello world'   },
  { value: 'title',    label: 'Title Case',   example: 'Hello World'   },
  { value: 'sentence', label: 'Sentence case',example: 'Hello world'   },
  { value: 'camel',    label: 'camelCase',    example: 'helloWorld'    },
  { value: 'pascal',   label: 'PascalCase',   example: 'HelloWorld'    },
  { value: 'snake',    label: 'snake_case',   example: 'hello_world'   },
  { value: 'kebab',    label: 'kebab-case',   example: 'hello-world'   },
];

export default function CaseConverter() {
  const [text, setText] = React.useState('');
  const [active, setActive] = React.useState<CaseType>('title');
  const [copied, setCopied] = React.useState(false);
  const output = React.useMemo(() => convert(text, active), [text, active]);

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ToolShell state="idle">
      <ToolShellSection label="Input text">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5}
          placeholder="Type or paste text here…"
          className="w-full rounded-lg border border-base-700 bg-base-900 p-3 text-sm text-base-100 placeholder:text-base-500 resize-y focus:outline-none focus:ring-1 focus:ring-interactive" />
      </ToolShellSection>

      <ToolShellSection label="Case style">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CASES.map((c) => (
            <button key={c.value} type="button" onClick={() => setActive(c.value)}
              className={`rounded-md border p-2 text-left transition-colors ${active === c.value ? 'border-interactive bg-interactive-muted' : 'border-base-700 bg-base-900 hover:border-base-500'}`}>
              <p className={`text-sm font-medium ${active === c.value ? 'text-interactive' : 'text-base-200'}`}>{c.label}</p>
              <p className="text-xs text-base-500 truncate">{c.example}</p>
            </button>
          ))}
        </div>
      </ToolShellSection>

      {text && (
        <div className="relative">
          <textarea readOnly value={output} rows={5}
            className="w-full rounded-lg border border-base-700 bg-base-900 p-3 text-sm text-base-100 resize-none focus:outline-none" />
          <button type="button" onClick={copy}
            className="absolute top-2 right-2 rounded-md border border-base-700 bg-base-800 px-2 py-1 text-xs text-base-300 hover:text-base-100 flex items-center gap-1 transition-colors">
            {copied ? <Check size={12} className="text-completion" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </ToolShell>
  );
}
