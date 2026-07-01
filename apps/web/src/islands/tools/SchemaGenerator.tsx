import * as React from 'react';
import { ToolShell, ToolShellSection } from '@toolorbit/ui';
import { Copy, Check } from 'lucide-react';

type SchemaType = 'Article' | 'FAQPage' | 'Product' | 'LocalBusiness' | 'BreadcrumbList' | 'SoftwareApplication';

interface FaqItem { q: string; a: string }

export default function SchemaGenerator() {
  const [type, setType]       = React.useState<SchemaType>('Article');
  const [copied, setCopied]   = React.useState(false);

  // Article fields
  const [artTitle, setArtTitle]   = React.useState('');
  const [artDesc, setArtDesc]     = React.useState('');
  const [artUrl, setArtUrl]       = React.useState('');
  const [artImg, setArtImg]       = React.useState('');
  const [artAuthor, setArtAuthor] = React.useState('');
  const [artDate, setArtDate]     = React.useState(new Date().toISOString().split('T')[0]);

  // FAQ fields
  const [faqs, setFaqs] = React.useState<FaqItem[]>([
    { q: 'What is this tool?', a: 'This tool generates Schema.org JSON-LD markup.' },
    { q: 'Is it free?', a: 'Yes, completely free to use.' },
  ]);

  // Product fields
  const [pName, setPName]   = React.useState('');
  const [pDesc, setPDesc]   = React.useState('');
  const [pPrice, setPPrice] = React.useState('');
  const [pCurr, setPCurr]   = React.useState('USD');
  const [pAvail, setPAvail] = React.useState('InStock');

  function buildSchema(): Record<string, unknown> {
    switch (type) {
      case 'Article': return {
        '@context': 'https://schema.org', '@type': 'Article',
        headline: artTitle, description: artDesc, url: artUrl,
        image: artImg, datePublished: artDate,
        author: { '@type': 'Person', name: artAuthor },
        publisher: { '@type': 'Organization', name: artAuthor },
      };
      case 'FAQPage': return {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.filter(f => f.q && f.a).map(f => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      };
      case 'Product': return {
        '@context': 'https://schema.org', '@type': 'Product',
        name: pName, description: pDesc,
        offers: { '@type': 'Offer', price: pPrice, priceCurrency: pCurr, availability: `https://schema.org/${pAvail}` },
      };
      case 'SoftwareApplication': return {
        '@context': 'https://schema.org', '@type': 'SoftwareApplication',
        name: artTitle, description: artDesc, applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      };
      default: return { '@context': 'https://schema.org', '@type': type };
    }
  }

  const json   = JSON.stringify(buildSchema(), null, 2);
  const output = `<script type="application/ld+json">\n${json}\n</script>`;
  const copy   = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <ToolShell>
      <ToolShellSection label="Schema Type">
        <div className="flex flex-wrap gap-2">
          {(['Article','FAQPage','Product','SoftwareApplication'] as SchemaType[]).map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${type === t ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 text-base-400 hover:text-base-200'}`}>
              {t}
            </button>
          ))}
        </div>
      </ToolShellSection>

      {(type === 'Article' || type === 'SoftwareApplication') && (
        <>
          <ToolShellSection label={type === 'Article' ? 'Article Title' : 'App Name'}>
            <input value={artTitle} onChange={e => setArtTitle(e.target.value)} placeholder="Enter title"
              className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
          </ToolShellSection>
          <ToolShellSection label="Description">
            <textarea value={artDesc} onChange={e => setArtDesc(e.target.value)} rows={2} placeholder="Brief description"
              className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none resize-none" />
          </ToolShellSection>
          {type === 'Article' && (
            <div className="grid gap-3 sm:grid-cols-2">
              <ToolShellSection label="Article URL"><input value={artUrl} onChange={e => setArtUrl(e.target.value)} placeholder="https://example.com/article" className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" /></ToolShellSection>
              <ToolShellSection label="Author"><input value={artAuthor} onChange={e => setArtAuthor(e.target.value)} placeholder="Jane Smith" className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" /></ToolShellSection>
              <ToolShellSection label="Image URL"><input value={artImg} onChange={e => setArtImg(e.target.value)} placeholder="https://example.com/img.jpg" className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" /></ToolShellSection>
              <ToolShellSection label="Published Date"><input type="date" value={artDate} onChange={e => setArtDate(e.target.value)} className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 focus:border-interactive focus:outline-none" /></ToolShellSection>
            </div>
          )}
        </>
      )}

      {type === 'FAQPage' && (
        <ToolShellSection label="FAQ Pairs">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border border-base-700 bg-base-900/50 p-3 space-y-2">
                <input value={faq.q} onChange={e => setFaqs(f => f.map((x, j) => j === i ? { ...x, q: e.target.value } : x))}
                  placeholder="Question" className="w-full rounded border border-base-700 bg-base-800 px-2 py-1.5 text-xs text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
                <textarea value={faq.a} onChange={e => setFaqs(f => f.map((x, j) => j === i ? { ...x, a: e.target.value } : x))}
                  rows={2} placeholder="Answer" className="w-full rounded border border-base-700 bg-base-800 px-2 py-1.5 text-xs text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none resize-none" />
              </div>
            ))}
            <button onClick={() => setFaqs(f => [...f, { q: '', a: '' }])}
              className="text-xs text-interactive hover:text-interactive/80 transition-colors">+ Add FAQ</button>
          </div>
        </ToolShellSection>
      )}

      {type === 'Product' && (
        <div className="grid gap-3 sm:grid-cols-2">
          <ToolShellSection label="Product Name"><input value={pName} onChange={e => setPName(e.target.value)} placeholder="Product Name" className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" /></ToolShellSection>
          <ToolShellSection label="Price"><input value={pPrice} onChange={e => setPPrice(e.target.value)} placeholder="29.99" className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" /></ToolShellSection>
          <ToolShellSection label="Currency">
            <select value={pCurr} onChange={e => setPCurr(e.target.value)} className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 focus:border-interactive focus:outline-none">
              {['USD','EUR','GBP','BDT','INR','CAD','AUD'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </ToolShellSection>
          <ToolShellSection label="Availability">
            <select value={pAvail} onChange={e => setPAvail(e.target.value)} className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 focus:border-interactive focus:outline-none">
              {['InStock','OutOfStock','PreOrder','Discontinued'].map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </ToolShellSection>
          <div className="sm:col-span-2">
            <ToolShellSection label="Description"><textarea value={pDesc} onChange={e => setPDesc(e.target.value)} rows={2} placeholder="Product description" className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none resize-none" /></ToolShellSection>
          </div>
        </div>
      )}

      <ToolShellSection label="Generated JSON-LD"
        action={
          <button onClick={copy} className="flex items-center gap-1 text-xs text-interactive hover:text-interactive/80 transition-colors">
            {copied ? <><Check size={12}/> Copied!</> : <><Copy size={12}/> Copy</>}
          </button>
        }>
        <pre className="max-h-80 overflow-auto rounded-lg border border-base-700 bg-base-950 p-4 text-xs text-base-300 leading-relaxed whitespace-pre">
          {output}
        </pre>
      </ToolShellSection>
    </ToolShell>
  );
}
