import * as React from 'react';
import { ToolShell, ToolShellSection } from '@toolorbit/ui';

const STOP_WORDS = new Set([
  'a','an','the','and','but','or','for','nor','on','at','to','from','by','with',
  'in','of','is','it','its','be','as','was','are','were','been','have','has','had',
  'do','does','did','will','would','could','should','may','might','shall','can',
  'this','that','these','those','i','you','he','she','we','they','me','him','her',
  'us','them','my','your','his','our','their','what','which','who','whom','when',
  'where','why','how','all','each','every','both','few','more','most','other',
  'some','such','no','not','only','same','so','than','too','very','just','also',
  'about','above','after','before','between','into','through','during','if','then',
  'because','while','although','however','therefore','thus','hence','since',
]);

interface WordStat { word: string; count: number; density: number }

export default function KeywordDensityChecker() {
  const [text, setText]           = React.useState('');
  const [filterStop, setFilterStop] = React.useState(true);
  const [tab, setTab]             = React.useState<'single'|'bigram'>('single');

  const stats = React.useMemo(() => {
    if (!text.trim()) return { words: [], bigrams: [], totalWords: 0 };
    const raw = text.toLowerCase().replace(/[^a-z0-9\s'-]/g, '').trim().split(/\s+/).filter(Boolean);
    const totalWords = raw.length;
    const tokens = filterStop ? raw.filter(w => !STOP_WORDS.has(w)) : raw;

    // Unigrams
    const freq: Record<string, number> = {};
    tokens.forEach(w => { freq[w] = (freq[w] ?? 0) + 1; });
    const words: WordStat[] = Object.entries(freq)
      .map(([word, count]) => ({ word, count, density: +((count / totalWords) * 100).toFixed(2) }))
      .sort((a, b) => b.count - a.count).slice(0, 20);

    // Bigrams (from all raw tokens, then filter)
    const allTokens = filterStop ? raw : raw;
    const biFreq: Record<string, number> = {};
    for (let i = 0; i < allTokens.length - 1; i++) {
      const a = allTokens[i], b = allTokens[i + 1];
      if (filterStop && (STOP_WORDS.has(a) || STOP_WORDS.has(b))) continue;
      const bigram = `${a} ${b}`;
      biFreq[bigram] = (biFreq[bigram] ?? 0) + 1;
    }
    const bigrams: WordStat[] = Object.entries(biFreq)
      .map(([word, count]) => ({ word, count, density: +((count / (totalWords - 1)) * 100).toFixed(2) }))
      .sort((a, b) => b.count - a.count).slice(0, 20);

    return { words, bigrams, totalWords };
  }, [text, filterStop]);

  const results = tab === 'single' ? stats.words : stats.bigrams;
  const maxCount = results[0]?.count ?? 1;

  return (
    <ToolShell>
      <ToolShellSection label="Paste your content">
        <textarea value={text} onChange={e => setText(e.target.value)} rows={7}
          placeholder="Paste your article, blog post, or page content here to analyze keyword density..."
          className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none resize-none" />
        <p className="mt-1 text-xs text-base-500">{stats.totalWords} total words</p>
      </ToolShellSection>

      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-lg border border-base-700 bg-base-900 p-0.5">
          {(['single','bigram'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${tab === t ? 'bg-interactive text-white' : 'text-base-400 hover:text-base-200'}`}>
              {t === 'single' ? 'Single keywords' : '2-word phrases'}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={filterStop} onChange={e => setFilterStop(e.target.checked)}
            className="h-3 w-3 rounded accent-interactive" />
          <span className="text-xs text-base-400">Filter stop words</span>
        </label>
      </div>

      {results.length > 0 ? (
        <div className="space-y-1.5">
          {results.map(({ word, count, density }) => (
            <div key={word} className="flex items-center gap-3">
              <span className="w-40 shrink-0 truncate font-mono text-xs text-base-200">{word}</span>
              <div className="flex-1 h-1.5 rounded-full bg-base-800 overflow-hidden">
                <div className="h-full rounded-full bg-interactive/60 transition-all duration-300"
                  style={{ width: `${(count / maxCount) * 100}%` }} />
              </div>
              <span className="w-12 shrink-0 text-right text-xs text-base-400">{count}×</span>
              <span className="w-14 shrink-0 text-right text-xs text-base-500">{density}%</span>
            </div>
          ))}
        </div>
      ) : text.trim() ? (
        <p className="text-center text-sm text-base-500">No keywords found with current filters.</p>
      ) : null}
    </ToolShell>
  );
}
