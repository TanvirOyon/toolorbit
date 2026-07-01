import * as React from 'react';
import { ToolShell, ToolShellSection } from '@toolorbit/ui';
import { Copy, Check } from 'lucide-react';

function useCopy() {
  const [copied, setCopied] = React.useState(false);
  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
}

export default function MetaTagGenerator() {
  const [title, setTitle]       = React.useState('');
  const [desc, setDesc]         = React.useState('');
  const [author, setAuthor]     = React.useState('');
  const [robots, setRobots]     = React.useState('index, follow');
  const [canonical, setCanonical] = React.useState('');
  const { copied, copy }        = useCopy();

  const titleLen = title.length;
  const descLen  = desc.length;

  const output = [
    `<!-- Primary Meta Tags -->`,
    title      ? `<title>${title}</title>` : '',
    title      ? `<meta name="title" content="${title}">` : '',
    desc       ? `<meta name="description" content="${desc}">` : '',
    author     ? `<meta name="author" content="${author}">` : '',
    robots     ? `<meta name="robots" content="${robots}">` : '',
    canonical  ? `<link rel="canonical" href="${canonical}">` : '',
    `<meta charset="UTF-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
  ].filter(Boolean).join('\n');

  return (
    <ToolShell>
      <ToolShellSection label="Page Title">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="My Awesome Page Title"
          className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
        <p className={`mt-1 text-xs ${titleLen > 60 ? 'text-error' : titleLen > 50 ? 'text-completion' : 'text-base-500'}`}>
          {titleLen}/60 characters {titleLen > 60 ? '- too long, Google will truncate' : titleLen > 50 ? '- approaching limit' : '- ideal range: 50–60'}
        </p>
      </ToolShellSection>

      <ToolShellSection label="Meta Description">
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3}
          placeholder="A concise description of this page for search engines (150–160 characters)."
          className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none resize-none" />
        <p className={`mt-1 text-xs ${descLen > 160 ? 'text-error' : descLen > 150 ? 'text-completion' : 'text-base-500'}`}>
          {descLen}/160 characters
        </p>
      </ToolShellSection>

      <div className="grid gap-3 sm:grid-cols-2">
        <ToolShellSection label="Author (optional)">
          <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Jane Smith"
            className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
        </ToolShellSection>
        <ToolShellSection label="Robots Directive">
          <select value={robots} onChange={e => setRobots(e.target.value)}
            className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 focus:border-interactive focus:outline-none">
            <option value="index, follow">index, follow (default)</option>
            <option value="noindex, follow">noindex, follow</option>
            <option value="index, nofollow">index, nofollow</option>
            <option value="noindex, nofollow">noindex, nofollow</option>
          </select>
        </ToolShellSection>
      </div>

      <ToolShellSection label="Canonical URL (optional)">
        <input value={canonical} onChange={e => setCanonical(e.target.value)} placeholder="https://example.com/my-page"
          className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
      </ToolShellSection>

      {title || desc ? (
        <ToolShellSection label="Generated Meta Tags"
          action={
            <button onClick={() => copy(output)}
              className="flex items-center gap-1 text-xs text-interactive hover:text-interactive/80 transition-colors">
              {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy all</>}
            </button>
          }>
          <pre className="overflow-x-auto rounded-lg border border-base-700 bg-base-950 p-4 text-xs text-base-300 leading-relaxed whitespace-pre-wrap">
            {output}
          </pre>
        </ToolShellSection>
      ) : (
        <p className="text-center text-sm text-base-500">Fill in any field above to generate meta tags.</p>
      )}
    </ToolShell>
  );
}
