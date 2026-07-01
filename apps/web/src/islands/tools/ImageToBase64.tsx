import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, type IrisState } from '@toolorbit/ui';
import { Code, Copy, Check } from 'lucide-react';

type OutputMode = 'dataUri' | 'rawBase64';

function fmtSize(b: number) { return b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(2)} MB`; }

export default function ImageToBase64() {
  const [file, setFile] = React.useState<File | null>(null);
  const [base64, setBase64] = React.useState('');
  const [dataUri, setDataUri] = React.useState('');
  const [mode, setMode] = React.useState<OutputMode>('dataUri');
  const [copied, setCopied] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'encoding' | 'done' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  async function encode(files: File[]) {
    const f = files[0]; if (!f) return;
    setFile(f); setStatus('encoding'); setError(null); setCopied(false);
    try {
      const raw = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const b64 = result.split(',')[1];
          resolve(b64);
        };
        reader.onerror = () => reject(new Error('FileReader failed'));
        reader.readAsDataURL(f);
      });
      setBase64(raw);
      setDataUri(`data:${f.type};base64,${raw}`);
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Encoding failed.'); setStatus('error');
    }
  }

  async function copy() {
    const text = mode === 'dataUri' ? dataUri : base64;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const output = mode === 'dataUri' ? dataUri : base64;
  const state: IrisState = status === 'encoding' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : 'idle';
  const encodedSize = base64 ? Math.ceil(base64.length * 0.75) : 0;

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="Image">
        <FileDropZone accept="image/*" onFiles={encode}
          label="Drop an image here, or click to browse"
          hint="Encoding runs locally - no upload" />
        {file && (
          <p className="mt-1.5 text-xs text-base-400">
            {file.name} - original {fmtSize(file.size)} → encoded ~{fmtSize(Math.ceil(file.size * 1.37))}
          </p>
        )}
      </ToolShellSection>

      {base64 && <>
        <ToolShellSection label="Output format">
          <div className="flex gap-2">
            <button type="button" onClick={() => setMode('dataUri')}
              className={`flex-1 rounded-md border py-2 text-sm font-medium transition-colors ${mode === 'dataUri' ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
              Data URI
            </button>
            <button type="button" onClick={() => setMode('rawBase64')}
              className={`flex-1 rounded-md border py-2 text-sm font-medium transition-colors ${mode === 'rawBase64' ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
              Raw Base64
            </button>
          </div>
          <p className="mt-1 text-xs text-base-400">
            {mode === 'dataUri' ? 'Paste as <img src="…"> or CSS background-image value' : 'Raw Base64 payload without the data: prefix'}
          </p>
        </ToolShellSection>

        <div className="relative">
          <textarea
            readOnly
            value={output}
            rows={6}
            className="w-full rounded-lg border border-base-700 bg-base-900 p-3 font-mono text-xs text-base-200 resize-none focus:outline-none focus:ring-1 focus:ring-interactive"
          />
          <button type="button" onClick={copy}
            className="absolute top-2 right-2 rounded-md border border-base-700 bg-base-800 px-2 py-1 text-xs text-base-300 hover:text-base-100 flex items-center gap-1 transition-colors">
            {copied ? <Check size={12} className="text-completion" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-xs text-base-400 text-center">
          {output.length.toLocaleString()} characters · ~{fmtSize(encodedSize)} decoded
        </p>
      </>}
    </ToolShell>
  );
}
