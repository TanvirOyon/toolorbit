import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, type IrisState } from '@toolorbit/ui';
import { Minimize2 } from 'lucide-react';

function fmtSize(b: number) { return b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(2)} MB`; }

export default function ImageCompress() {
  const [file, setFile] = React.useState<File | null>(null);
  const [maxSizeMB, setMaxSizeMB] = React.useState(1);
  const [result, setResult] = React.useState<{ blob: Blob; url: string } | null>(null);
  const [status, setStatus] = React.useState<'idle' | 'compressing' | 'done' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  function loadFile(files: File[]) {
    const f = files[0]; if (!f) return;
    if (!f.type.startsWith('image/')) { setError('Only image files are accepted.'); return; }
    setFile(f);
    if (result) URL.revokeObjectURL(result.url);
    setResult(null); setStatus('idle'); setError(null);
  }

  async function compress() {
    if (!file) return;
    setStatus('compressing'); setError(null);
    try {
      const imageCompression = (await import('browser-image-compression')).default;
      const compressed = await imageCompression(file, {
        maxSizeMB,
        maxWidthOrHeight: 4096,
        useWebWorker: true,
        fileType: file.type as 'image/jpeg' | 'image/png' | 'image/webp',
      });
      if (result) URL.revokeObjectURL(result.url);
      setResult({ blob: compressed, url: URL.createObjectURL(compressed) });
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Compression failed.'); setStatus('error');
    }
  }

  function download() {
    if (!result || !file) return;
    const a = document.createElement('a'); a.href = result.url; a.download = `compressed-${file.name}`; a.click();
  }

  const savings = result ? ((file!.size - result.blob.size) / file!.size) * 100 : 0;
  const state: IrisState = status === 'compressing' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="Image">
        <FileDropZone accept="image/jpeg,image/png,image/webp" onFiles={loadFile}
          label="Drop a JPG, PNG, or WebP image here"
          hint="Files are compressed locally in your browser" />
        {file && <p className="mt-1.5 text-xs text-base-400">{file.name} - {fmtSize(file.size)}</p>}
      </ToolShellSection>

      <ToolShellSection label={`Target max size: ${maxSizeMB} MB`}>
        <input type="range" min={0.1} max={5} step={0.1} value={maxSizeMB}
          onChange={(e) => setMaxSizeMB(parseFloat(e.target.value))}
          className="w-full accent-interactive" />
        <p className="mt-1 text-xs text-base-400">
          The compressor will try to fit the output within this size. Tiny files may not reach the target.
        </p>
      </ToolShellSection>

      <Button onClick={compress} disabled={!file || status === 'compressing'} className="w-full">
        <Minimize2 size={16} />
        {status === 'compressing' ? 'Compressing…' : 'Compress Image'}
      </Button>

      {result && (
        <div className="rounded-lg border border-base-700 bg-base-800/50 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-xs text-base-400 uppercase tracking-wide">Original</p>
              <p className="text-base font-mono text-base-100">{fmtSize(file!.size)}</p>
            </div>
            <div>
              <p className="text-xs text-base-400 uppercase tracking-wide">Compressed</p>
              <p className={`text-base font-mono ${savings > 0 ? 'text-completion' : 'text-base-100'}`}>
                {fmtSize(result.blob.size)}
              </p>
            </div>
          </div>
          {savings > 0 && (
            <p className="text-center text-sm text-base-300">
              {savings.toFixed(1)}% smaller - {fmtSize(file!.size - result.blob.size)} saved
            </p>
          )}
          <Button onClick={download} className="w-full" variant="secondary">
            Download Compressed Image
          </Button>
        </div>
      )}
    </ToolShell>
  );
}
