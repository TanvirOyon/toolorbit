import * as React from 'react';
import { ToolShell, ToolShellSection } from '@toolorbit/ui';
import { Copy, Check, Plus, Trash2, Download } from 'lucide-react';

interface UrlEntry { id: number; url: string; priority: string; changefreq: string; lastmod: string }

const FREQS = ['always','hourly','daily','weekly','monthly','yearly','never'];

export default function SitemapGenerator() {
  const [entries, setEntries] = React.useState<UrlEntry[]>([
    { id: 1, url: 'https://example.com/', priority: '1.0', changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
    { id: 2, url: 'https://example.com/about', priority: '0.7', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  ]);
  const [copied, setCopied] = React.useState(false);
  const nextId = React.useRef(3);

  function addEntry() {
    setEntries(e => [...e, { id: nextId.current++, url: '', priority: '0.5', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] }]);
  }
  function update(id: number, field: keyof UrlEntry, value: string) {
    setEntries(e => e.map(en => en.id === id ? { ...en, [field]: value } : en));
  }
  function remove(id: number) { setEntries(e => e.filter(en => en.id !== id)); }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.filter(e => e.url).map(e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const copy = async () => { await navigator.clipboard.writeText(xml); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const download = () => {
    const blob = new Blob([xml], { type: 'application/xml' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'sitemap.xml'; a.click();
  };

  return (
    <ToolShell>
      <ToolShellSection label={`URLs (${entries.filter(e => e.url).length} entries)`}>
        <div className="space-y-2">
          {entries.map(en => (
            <div key={en.id} className="grid gap-2 rounded-lg border border-base-700 bg-base-900/50 p-3 sm:grid-cols-[1fr_auto_auto_auto_auto]">
              <input value={en.url} onChange={e => update(en.id, 'url', e.target.value)}
                placeholder="https://example.com/page"
                className="rounded border border-base-700 bg-base-800 px-2 py-1.5 text-xs text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
              <input type="date" value={en.lastmod} onChange={e => update(en.id, 'lastmod', e.target.value)}
                className="rounded border border-base-700 bg-base-800 px-2 py-1.5 text-xs text-base-50 focus:border-interactive focus:outline-none" />
              <select value={en.changefreq} onChange={e => update(en.id, 'changefreq', e.target.value)}
                className="rounded border border-base-700 bg-base-800 px-2 py-1.5 text-xs text-base-50 focus:border-interactive focus:outline-none">
                {FREQS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <select value={en.priority} onChange={e => update(en.id, 'priority', e.target.value)}
                className="rounded border border-base-700 bg-base-800 px-2 py-1.5 text-xs text-base-50 focus:border-interactive focus:outline-none">
                {['1.0','0.9','0.8','0.7','0.6','0.5','0.4','0.3','0.2','0.1'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              {entries.length > 1 && (
                <button onClick={() => remove(en.id)} className="text-base-500 hover:text-error transition-colors">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={addEntry} className="mt-2 flex items-center gap-1.5 text-xs text-interactive hover:text-interactive/80 transition-colors">
          <Plus size={14} /> Add URL
        </button>
      </ToolShellSection>

      <ToolShellSection label="Generated sitemap.xml"
        action={
          <div className="flex gap-3">
            <button onClick={copy} className="flex items-center gap-1 text-xs text-interactive hover:text-interactive/80 transition-colors">
              {copied ? <><Check size={12}/> Copied!</> : <><Copy size={12}/> Copy</>}
            </button>
            <button onClick={download} className="flex items-center gap-1 text-xs text-interactive hover:text-interactive/80 transition-colors">
              <Download size={12}/> Download
            </button>
          </div>
        }>
        <pre className="max-h-64 overflow-auto rounded-lg border border-base-700 bg-base-950 p-4 text-xs text-base-300 leading-relaxed whitespace-pre">
          {xml}
        </pre>
      </ToolShellSection>
    </ToolShell>
  );
}
