import * as React from 'react';
import { ToolShell, ToolShellSection } from '@toolorbit/ui';
import { Copy, Check, Plus, Trash2 } from 'lucide-react';

interface Rule { id: number; agent: string; disallow: string; allow: string }

const AI_BOTS = ['GPTBot','CCBot','Google-Extended','ClaudeBot','Bytespider','Applebot-Extended','PerplexityBot','Amazonbot'];

export default function RobotsTxtGenerator() {
  const [rules, setRules]         = React.useState<Rule[]>([
    { id: 1, agent: '*', disallow: '', allow: '' },
  ]);
  const [sitemap, setSitemap]     = React.useState('');
  const [blockAI, setBlockAI]     = React.useState(false);
  const [copied, setCopied]       = React.useState(false);
  const nextId = React.useRef(2);

  function addRule() {
    setRules(r => [...r, { id: nextId.current++, agent: '', disallow: '', allow: '' }]);
  }
  function updateRule(id: number, field: keyof Rule, value: string) {
    setRules(r => r.map(rule => rule.id === id ? { ...rule, [field]: value } : rule));
  }
  function removeRule(id: number) {
    setRules(r => r.filter(rule => rule.id !== id));
  }

  const output = [
    ...rules.map(r => [
      r.agent    ? `User-agent: ${r.agent}` : '',
      r.disallow ? `Disallow: ${r.disallow}` : 'Disallow:',
      r.allow    ? `Allow: ${r.allow}` : '',
    ].filter(Boolean).join('\n')),
    ...(blockAI ? [AI_BOTS.map(b => `User-agent: ${b}\nDisallow: /`).join('\n\n')] : []),
    sitemap ? `\nSitemap: ${sitemap}` : '',
  ].filter(Boolean).join('\n\n');

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolShell>
      <ToolShellSection label="Crawler Rules">
        <div className="space-y-3">
          {rules.map(rule => (
            <div key={rule.id} className="rounded-lg border border-base-700 bg-base-900/50 p-3 space-y-2">
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <label className="text-xs text-base-500">User-agent</label>
                  <input value={rule.agent} onChange={e => updateRule(rule.id, 'agent', e.target.value)}
                    placeholder="* (all)" list="agent-list"
                    className="mt-1 w-full rounded border border-base-700 bg-base-800 px-2 py-1.5 text-xs text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-base-500">Disallow</label>
                  <input value={rule.disallow} onChange={e => updateRule(rule.id, 'disallow', e.target.value)}
                    placeholder="/admin/"
                    className="mt-1 w-full rounded border border-base-700 bg-base-800 px-2 py-1.5 text-xs text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-base-500">Allow</label>
                    <input value={rule.allow} onChange={e => updateRule(rule.id, 'allow', e.target.value)}
                      placeholder="/admin/public/"
                      className="mt-1 w-full rounded border border-base-700 bg-base-800 px-2 py-1.5 text-xs text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
                  </div>
                  {rules.length > 1 && (
                    <button onClick={() => removeRule(rule.id)} className="mt-5 text-base-500 hover:text-error transition-colors">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button onClick={addRule}
            className="flex items-center gap-1.5 text-xs text-interactive hover:text-interactive/80 transition-colors">
            <Plus size={14} /> Add rule
          </button>
        </div>
        <datalist id="agent-list">
          {['Googlebot','Bingbot','*', ...AI_BOTS].map(b => <option key={b} value={b} />)}
        </datalist>
      </ToolShellSection>

      <ToolShellSection label="Block AI Training Crawlers">
        <label className="flex cursor-pointer items-center gap-3">
          <div className="relative">
            <input type="checkbox" checked={blockAI} onChange={e => setBlockAI(e.target.checked)} className="sr-only" />
            <div className={`h-5 w-9 rounded-full transition-colors ${blockAI ? 'bg-interactive' : 'bg-base-700'}`} />
            <div className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${blockAI ? 'translate-x-4' : ''}`} />
          </div>
          <span className="text-sm text-base-200">Block GPTBot, CCBot, Google-Extended, ClaudeBot, Bytespider & more</span>
        </label>
      </ToolShellSection>

      <ToolShellSection label="Sitemap URL (optional)">
        <input value={sitemap} onChange={e => setSitemap(e.target.value)}
          placeholder="https://example.com/sitemap.xml"
          className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-50 placeholder-base-500 focus:border-interactive focus:outline-none" />
      </ToolShellSection>

      <ToolShellSection label="Generated robots.txt"
        action={
          <button onClick={copy} className="flex items-center gap-1 text-xs text-interactive hover:text-interactive/80 transition-colors">
            {copied ? <><Check size={12}/> Copied!</> : <><Copy size={12}/> Copy</>}
          </button>
        }>
        <pre className="overflow-x-auto rounded-lg border border-base-700 bg-base-950 p-4 text-xs text-base-300 leading-relaxed whitespace-pre-wrap">
          {output || '# Fill in fields above to generate your robots.txt'}
        </pre>
      </ToolShellSection>
    </ToolShell>
  );
}
