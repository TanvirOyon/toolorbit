import * as React from 'react';
import { ToolShell, ToolShellSection, Textarea, Input, CopyButton, type IrisState } from '@toolorbit/ui';

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
  'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit',
  'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt',
  'mollit', 'anim', 'id', 'est', 'laborum', 'curabitur', 'pretium', 'tincidunt', 'lacus',
  'nullam', 'gravida', 'orci', 'mauris', 'sapien', 'pellentesque', 'habitant', 'morbi',
  'tristique', 'senectus', 'netus', 'malesuada', 'fames', 'turpis', 'egestas',
];

type Mode = 'paragraphs' | 'sentences' | 'words';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function generateSentence(minWords = 6, maxWords = 14): string {
  const len = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words = Array.from({ length: len }, () => pick(WORDS));
  let sentence = words.join(' ');
  sentence = capitalize(sentence) + '.';
  return sentence;
}

function generateParagraph(sentenceCount = 5): string {
  return Array.from({ length: sentenceCount }, () => generateSentence()).join(' ');
}

function generate(mode: Mode, count: number, classicStart: boolean): string {
  if (mode === 'words') {
    const words = Array.from({ length: count }, () => pick(WORDS));
    if (classicStart) {
      const classic = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
      for (let i = 0; i < Math.min(classic.length, words.length); i++) words[i] = classic[i];
    }
    return capitalize(words.join(' ')) + '.';
  }

  if (mode === 'sentences') {
    const sentences = Array.from({ length: count }, () => generateSentence());
    if (classicStart) {
      sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    }
    return sentences.join(' ');
  }

  const paragraphs = Array.from({ length: count }, () => generateParagraph());
  if (classicStart) {
    paragraphs[0] =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + paragraphs[0];
  }
  return paragraphs.join('\n\n');
}

export default function LoremIpsumGenerator() {
  const [mode, setMode] = React.useState<Mode>('paragraphs');
  const [count, setCount] = React.useState(3);
  const [classicStart, setClassicStart] = React.useState(true);
  const [output, setOutput] = React.useState(() => generate('paragraphs', 3, true));

  function regenerate(m = mode, c = count, classic = classicStart) {
    setOutput(generate(m, Math.min(Math.max(c, 1), 50), classic));
  }

  React.useEffect(() => {
    regenerate(mode, count, classicStart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, count, classicStart]);

  const state: IrisState = output ? 'complete' : 'idle';

  return (
    <ToolShell state={state}>
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex gap-1 rounded-md bg-base-800 p-1">
          {(['paragraphs', 'sentences', 'words'] as Mode[]).map((m) => (
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

        <div className="w-24">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-base-400">
            Count
          </label>
          <Input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm text-base-300">
          <input
            type="checkbox"
            checked={classicStart}
            onChange={(e) => setClassicStart(e.target.checked)}
            className="accent-interactive"
          />
          Start with "Lorem ipsum dolor sit amet"
        </label>
      </div>

      <ToolShellSection label="Output" action={<CopyButton value={output} />}>
        <Textarea rows={12} readOnly value={output} />
      </ToolShellSection>
    </ToolShell>
  );
}
