import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, Input, type IrisState } from '@toolorbit/ui';
import { RotateCw } from 'lucide-react';

function downloadBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

const ANGLES = [90, 180, 270] as const;
type Angle = (typeof ANGLES)[number];

export default function PdfRotate() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [angle, setAngle] = React.useState<Angle>(90);
  const [pageSpec, setPageSpec] = React.useState('all');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'ready' | 'processing' | 'done' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  async function loadFile(files: File[]) {
    const f = files[0]; if (!f) return;
    setFile(f); setStatus('loading'); setError(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(new Uint8Array(await f.arrayBuffer()));
      setPageCount(doc.getPageCount());
      setStatus('ready');
    } catch {
      setError('Could not read PDF. It may be encrypted or corrupted.');
      setStatus('error');
    }
  }

  function parseSpec(): number[] | null {
    if (pageSpec.trim() === 'all') return Array.from({ length: pageCount }, (_, i) => i);
    const indices: Set<number> = new Set();
    for (const part of pageSpec.split(',')) {
      const t = part.trim();
      const range = t.match(/^(\d+)-(\d+)$/);
      if (range) {
        const a = parseInt(range[1], 10), b = parseInt(range[2], 10);
        if (a < 1 || b > pageCount || a > b) return null;
        for (let i = a; i <= b; i++) indices.add(i - 1);
      } else {
        const n = parseInt(t, 10);
        if (isNaN(n) || n < 1 || n > pageCount) return null;
        indices.add(n - 1);
      }
    }
    return indices.size > 0 ? Array.from(indices) : null;
  }

  async function rotate() {
    if (!file) return;
    const indices = parseSpec();
    if (!indices) { setError(`Invalid page range. Enter page numbers 1–${pageCount} or "all".`); return; }
    setStatus('processing'); setError(null);
    try {
      const { PDFDocument, degrees } = await import('pdf-lib');
      const doc = await PDFDocument.load(new Uint8Array(await file.arrayBuffer()));
      const pages = doc.getPages();
      for (const idx of indices) {
        const page = pages[idx];
        page.setRotation(degrees((page.getRotation().angle + angle) % 360));
      }
      downloadBytes(await doc.save({ useObjectStreams: true }), `rotated-${file.name}`);
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Rotation failed.');
      setStatus('error');
    }
  }

  const state: IrisState = status === 'processing' || status === 'loading' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : status === 'ready' ? 'complete' : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="PDF File">
        <FileDropZone accept=".pdf,application/pdf" onFiles={loadFile}
          label="Drop a PDF here, or click to browse" hint="Files stay on your device" />
        {file && status === 'ready' && (
          <p className="mt-1.5 text-xs text-base-400">{file.name} - {pageCount} pages</p>
        )}
      </ToolShellSection>

      {status === 'ready' && <>
        <ToolShellSection label="Rotation angle">
          <div className="flex gap-2">
            {ANGLES.map((a) => (
              <button key={a} type="button" onClick={() => setAngle(a)}
                className={`flex-1 rounded-md border py-2 text-sm font-medium transition-colors ${angle === a ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
                {a}°
              </button>
            ))}
          </div>
        </ToolShellSection>
        <ToolShellSection label="Pages to rotate">
          <Input value={pageSpec} onChange={(e) => setPageSpec(e.target.value)}
            placeholder={`all  or  1, 3-5  (max: ${pageCount})`} />
          <p className="mt-1 text-xs text-base-400">Type "all" or specific page numbers/ranges</p>
        </ToolShellSection>
      </>}

      <Button onClick={rotate} disabled={status !== 'ready'} className="w-full">
        <RotateCw size={16} />
        {status === 'processing' ? 'Rotating…' : 'Rotate & Download PDF'}
      </Button>
    </ToolShell>
  );
}
