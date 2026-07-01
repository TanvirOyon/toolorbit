import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, type IrisState } from '@toolorbit/ui';
import { RefreshCw } from 'lucide-react';

type Fmt = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/avif';
const FORMATS: { value: Fmt; label: string }[] = [
  { value: 'image/png',  label: 'PNG'  },
  { value: 'image/jpeg', label: 'JPG'  },
  { value: 'image/webp', label: 'WebP' },
  { value: 'image/avif', label: 'AVIF' },
];
const EXT: Record<Fmt, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/avif': 'avif' };

function fmtSize(b: number) { return b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(2)} MB`; }

export default function ImageConvert() {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState('');
  const [fmt, setFmt] = React.useState<Fmt>('image/webp');
  const [quality, setQuality] = React.useState(90);
  const [result, setResult] = React.useState<{ blob: Blob; url: string } | null>(null);
  const [status, setStatus] = React.useState<'idle' | 'converting' | 'done' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  function loadFile(files: File[]) {
    const f = files[0]; if (!f) return;
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
    if (result) URL.revokeObjectURL(result.url);
    setResult(null); setStatus('idle'); setError(null);
  }

  async function convert() {
    if (!file) return;
    setStatus('converting'); setError(null);
    try {
      const bmp = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.width = bmp.width; canvas.height = bmp.height;
      canvas.getContext('2d')!.drawImage(bmp, 0, 0);
      const q = fmt === 'image/png' ? undefined : quality / 100;
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, fmt, q));
      if (!blob) throw new Error(`Your browser does not support encoding ${fmt}.`);
      if (result) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob) });
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed.'); setStatus('error');
    }
  }

  function download() {
    if (!result || !file) return;
    const base = file.name.replace(/\.[^.]+$/, '');
    const a = document.createElement('a');
    a.href = result.url; a.download = `${base}.${EXT[fmt]}`; a.click();
  }

  const needsQuality = fmt !== 'image/png';
  const state: IrisState = status === 'converting' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="Image">
        <FileDropZone accept="image/*" onFiles={loadFile}
          label="Drop an image here, or click to browse"
          hint="JPG, PNG, WebP, AVIF supported" />
        {file && <p className="mt-1.5 text-xs text-base-400">{file.name} - {fmtSize(file.size)}</p>}
      </ToolShellSection>

      <ToolShellSection label="Output format">
        <div className="flex gap-2 flex-wrap">
          {FORMATS.map((f) => (
            <button key={f.value} type="button" onClick={() => setFmt(f.value)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${fmt === f.value ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </ToolShellSection>

      {needsQuality && (
        <ToolShellSection label={`Quality: ${quality}%`}>
          <input type="range" min={10} max={100} value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value, 10))}
            className="w-full accent-interactive" />
          <p className="mt-1 text-xs text-base-400">Lower quality = smaller file size with more compression artifacts</p>
        </ToolShellSection>
      )}

      <Button onClick={convert} disabled={!file || status === 'converting'} className="w-full">
        <RefreshCw size={16} />
        {status === 'converting' ? 'Converting…' : `Convert to ${FORMATS.find((f) => f.value === fmt)?.label}`}
      </Button>

      {result && (
        <div className="rounded-lg border border-base-700 bg-base-800/50 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-xs text-base-400 uppercase tracking-wide">Original</p>
              <p className="text-base font-mono text-base-100">{fmtSize(file!.size)}</p>
            </div>
            <div>
              <p className="text-xs text-base-400 uppercase tracking-wide">Converted</p>
              <p className={`text-base font-mono ${result.blob.size < file!.size ? 'text-completion' : 'text-base-100'}`}>
                {fmtSize(result.blob.size)}
              </p>
            </div>
          </div>
          <Button onClick={download} className="w-full" variant="secondary">
            Download {FORMATS.find((f) => f.value === fmt)?.label}
          </Button>
        </div>
      )}
    </ToolShell>
  );
}
