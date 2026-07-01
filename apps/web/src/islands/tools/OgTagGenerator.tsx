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

type ContentType = 'website' | 'article';

export default function OgTagGenerator() {
  const [url, setUrl]           = React.useState('');
  const [title, setTitle]       = React.useState('');
  const [desc, setDesc]         = React.useState('');
  const [image, setImage]       = React.useState('');
  const [siteName, setSiteName] = React.useState('');
  const [type, setType]         = React.useState<ContentType>('website');
  const [twitterUser, setTwitterUser] = React.useState('');
  const { copied, copy }        = useCopy();

  const ogTags = [
    `<!-- Open Graph / Facebook -->`,
    `<meta property="og:type" content="${type}">`,
    url       ? `<meta property="og:url" content="${url}">` : '',
    title     ? `<meta property="og:title" content="${title}">` : '',
    desc      ? `<meta property="og:description" content="${desc}">` : '',
    image     ? `<meta property="og:image" content="${image}">` : '',
    image     ? `<meta property="og:image:width" content="1200">` : '',
    image     ? `<meta property="og:image:height" content="630">` : '',
    siteName  ? `<meta property="og:site_name" content="${siteName}">` : '',
    ``,
    `<!-- Twitter Card -->`,
    `<meta name="twitter:card" content="summary_large_image">`,
    twitterUser ? `<meta name="twitter:site" content="@${twitterUser.replace('@','')}">` : '',
    title     ? `<meta name="twitter:title" content="${title}">` : '',
    desc      ? `<meta name="twitter:description" content="${desc}">` : '',
    image     ? `<meta name="twitter:image" content="${image}">` : '',
  ].filter(l => l !== undefined).join('\n');

  const hasContent = url || title || desc || image;

  return (
    <ToolShell>
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolShellSection label="Content Type">
          <select value={type} onChange={e => setType(e.target.value as ContentType)}
            className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 focus:border-interactive focus:outline-none">
            <option value="website">website</option>
            <option value="article">article</option>
          </select>
        </ToolShellSection>
        <ToolShellSection label="Site Name">
          <input value={siteName} onChange={e => setSiteName(e.target.value)} placeholder="My Brand"
            className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
        </ToolShellSection>
      </div>

      <ToolShellSection label="Canonical URL">
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page"
          className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
      </ToolShellSection>

      <ToolShellSection label="OG Title">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Your page title for social sharing"
          className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
        <p className="mt-1 text-xs text-base-500">{title.length}/60 recommended</p>
      </ToolShellSection>

      <ToolShellSection label="OG Description">
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2}
          placeholder="A compelling description for social media previews."
          className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none resize-none" />
        <p className="mt-1 text-xs text-base-500">{desc.length}/160 recommended</p>
      </ToolShellSection>

      <ToolShellSection label="Image URL (1200×630px recommended)">
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="https://example.com/og-image.jpg"
          className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
      </ToolShellSection>

      <ToolShellSection label="Twitter @username (optional)">
        <input value={twitterUser} onChange={e => setTwitterUser(e.target.value)} placeholder="@mybrand"
          className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
      </ToolShellSection>

      {hasContent ? (
        <ToolShellSection label="Generated Tags"
          action={
            <button onClick={() => copy(ogTags)}
              className="flex items-center gap-1 text-xs text-interactive hover:text-interactive/80 transition-colors">
              {copied ? <><Check size={12}/> Copied!</> : <><Copy size={12}/> Copy all</>}
            </button>
          }>
          <pre className="overflow-x-auto rounded-lg border border-base-700 bg-base-950 p-4 text-xs text-base-300 leading-relaxed whitespace-pre-wrap">
            {ogTags}
          </pre>
        </ToolShellSection>
      ) : (
        <p className="text-center text-sm text-base-500">Fill in fields above to generate OG tags.</p>
      )}
    </ToolShell>
  );
}
