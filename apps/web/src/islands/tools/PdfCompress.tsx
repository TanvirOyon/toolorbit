import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, type IrisState } from '@toolorbit/ui';
import { Package } from 'lucide-react';

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function downloadBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function PdfCompress() {
  const [file, setFile] = React.useState<File | null>(null);
  const [result, setResult] = React.useState<{ original: number; compressed: number; bytes: Uint8Array } | null>(null);
  const [status, setStatus] = React.useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  async function compress(files: File[]) {
    const f = files[0]; if (!f) return;
    setFile(f); setStatus('processing'); setError(null); setResult(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const srcBytes = new Uint8Array(await f.arrayBuffer());
      const doc = await PDFDocument.load(srcBytes);
      const outBytes = await doc.save({ useObjectStreams: true, addDefaultPage: false });
      setResult({ original: srcBytes.length, compressed: outBytes.length, bytes: outBytes });
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Compression failed. The PDF may be encrypted.');
      setStatus('error');
    }
  }

  function download() {
    if (!result || !file) return;
    downloadBytes(result.bytes, `compressed-${file.name}`);
  }

  const savings = result ? ((result.original - result.compressed) / result.original) * 100 : 0;
  const state: IrisState = status === 'processing' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="PDF File">
        <FileDropZone accept=".pdf,application/pdf" onFiles={compress}
          label="Drop a PDF to compress, or click to browse"
          hint="Processing happens locally - no upload" />
      </ToolShellSection>

      {status === 'processing' && (
        <p className="text-sm text-base-300 text-center">Optimizing PDF structure…</p>
      )}

      {result && (
        <div className="rounded-lg border border-base-700 bg-base-800/50 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-xs text-base-400 uppercase tracking-wide">Original</p>
              <p className="text-lg font-mono font-semibold text-base-100">{fmtSize(result.original)}</p>
            </div>
            <div>
              <p className="text-xs text-base-400 uppercase tracking-wide">Compressed</p>
              <p className={`text-lg font-mono font-semibold ${result.compressed < result.original ? 'text-completion' : 'text-base-100'}`}>
                {fmtSize(result.compressed)}
              </p>
            </div>
          </div>
          <p className="text-center text-sm text-base-300">
            {savings > 0
              ? `${savings.toFixed(1)}% smaller - ${fmtSize(result.original - result.compressed)} saved`
              : 'File is already optimized - size unchanged'}
          </p>
          <Button onClick={download} className="w-full">
            <Package size={16} /> Download Compressed PDF
          </Button>
        </div>
      )}

      {status === 'idle' && !result && (
        <Button disabled className="w-full">
          <Package size={16} /> Drop a file above to compress
        </Button>
      )}
    </ToolShell>
  );
}
