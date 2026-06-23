import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, Input, type IrisState } from '@toolorbit/ui';
import { Scissors } from 'lucide-react';

function downloadBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/** Parse "1, 3-5, 8" into zero-indexed page array. Returns null on invalid input. */
function parsePageSpec(spec: string, totalPages: number): number[] | null {
  const indices: Set<number> = new Set();
  for (const part of spec.split(',')) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const range = trimmed.match(/^(\d+)-(\d+)$/);
    if (range) {
      const from = parseInt(range[1], 10);
      const to = parseInt(range[2], 10);
      if (from < 1 || to > totalPages || from > to) return null;
      for (let i = from; i <= to; i++) indices.add(i - 1);
    } else {
      const n = parseInt(trimmed, 10);
      if (isNaN(n) || n < 1 || n > totalPages) return null;
      indices.add(n - 1);
    }
  }
  return indices.size > 0 ? Array.from(indices).sort((a, b) => a - b) : null;
}

export default function PdfSplit() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [spec, setSpec] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'ready' | 'processing' | 'done' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  async function loadFile(files: File[]) {
    const f = files[0];
    if (!f) return;
    setFile(f); setStatus('loading'); setError(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(new Uint8Array(await f.arrayBuffer()));
      setPageCount(doc.getPageCount());
      setStatus('ready');
    } catch (e) {
      setError('Could not read PDF. It may be encrypted or invalid.'); setStatus('error');
    }
  }

  async function split() {
    if (!file || !pageCount) return;
    const indices = parsePageSpec(spec, pageCount);
    if (!indices) { setError(`Invalid page range. Enter page numbers between 1 and ${pageCount}.`); return; }
    setStatus('processing'); setError(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const src = await PDFDocument.load(new Uint8Array(await file.arrayBuffer()));
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, indices);
      pages.forEach((p) => out.addPage(p));
      const bytes = await out.save({ useObjectStreams: true });
      downloadBytes(bytes, `split-pages.pdf`);
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Split failed.'); setStatus('error');
    }
  }

  const state: IrisState = status === 'processing' || status === 'loading' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : status === 'ready' ? 'complete' : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="PDF File">
        <FileDropZone accept=".pdf,application/pdf" onFiles={loadFile}
          label="Drop a PDF here, or click to browse" hint="Files stay on your device" />
        {file && status === 'ready' && (
          <p className="mt-1.5 text-xs text-base-400">{file.name} — {pageCount} pages</p>
        )}
      </ToolShellSection>
      {status === 'ready' && (
        <ToolShellSection label={`Pages to extract (1–${pageCount})`}>
          <Input
            placeholder={`e.g. 1, 3-5, 8  (max page: ${pageCount})`}
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
          />
          <p className="mt-1 text-xs text-base-400">
            Comma-separated page numbers or ranges. Example: <code>1, 3-5, 8</code>
          </p>
        </ToolShellSection>
      )}
      <Button
        onClick={split}
        disabled={status !== 'ready' || !spec.trim() || status === 'processing'}
        className="w-full"
      >
        <Scissors size={16} />
        {status === 'processing' ? 'Splitting...' : 'Extract Pages & Download'}
      </Button>
    </ToolShell>
  );
}
