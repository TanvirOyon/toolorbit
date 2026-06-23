import * as React from 'react';
import { ToolShell, ToolShellSection } from '@toolorbit/ui';

interface Stats { words: number; chars: number; charsNoSpace: number; sentences: number; paragraphs: number; readingTime: string }

function analyze(text: string): Stats {
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+/g) || []).length || (text.trim() ? 1 : 0) : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  const mins = Math.max(1, Math.round(words / 200));
  const readingTime = mins === 1 ? '~1 min' : `~${mins} min`;
  return { words, chars, charsNoSpace, sentences, paragraphs, readingTime };
}

const STAT_LABELS: { key: keyof Stats; label: string }[] = [
  { key: 'words',        label: 'Words'           },
  { key: 'chars',        label: 'Characters'      },
  { key: 'charsNoSpace', label: 'Chars (no space)'},
  { key: 'sentences',    label: 'Sentences'       },
  { key: 'paragraphs',   label: 'Paragraphs'      },
  { key: 'readingTime',  label: 'Reading time'    },
];

export default function WordCounter() {
  const [text, setText] = React.useState('');
  const stats = React.useMemo(() => analyze(text), [text]);

  return (
    <ToolShell state="idle">
      <ToolShellSection label="Your text">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Start typing or paste your text here…"
          className="w-full rounded-lg border border-base-700 bg-base-900 p-3 text-sm text-base-100 placeholder:text-base-500 resize-y focus:outline-none focus:ring-1 focus:ring-interactive"
        />
      </ToolShellSection>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {STAT_LABELS.map(({ key, label }) => (
          <div key={key} className="rounded-lg border border-base-700 bg-base-800/50 p-3 text-center">
            <p className="text-xs text-base-400 uppercase tracking-wide mb-1">{label}</p>
            <p className="text-xl font-mono font-semibold text-base-100">{stats[key]}</p>
          </div>
        ))}
      </div>

      {text.length > 0 && (
        <button type="button" onClick={() => setText('')}
          className="text-xs text-base-500 hover:text-base-300 transition-colors w-full text-center">
          Clear text
        </button>
      )}
    </ToolShell>
  );
}
