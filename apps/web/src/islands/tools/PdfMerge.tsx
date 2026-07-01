import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, type IrisState } from '@toolorbit/ui';
import { Combine, Trash2, GripVertical } from 'lucide-react';

interface PdfFile {
  id: string;
  file: File;
}

function downloadBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function PdfMerge() {
  const [items, setItems] = React.useState<PdfFile[]>([]);
  const [status, setStatus] = React.useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);
  const dragIdx = React.useRef<number | null>(null);

  function addFiles(files: File[]) {
    const pdfs = files.filter((f) => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
    if (pdfs.length !== files.length) setError('Only PDF files are accepted. Non-PDF files were skipped.');
    setItems((prev) => [
      ...prev,
      ...pdfs.map((f) => ({ id: `${f.name}-${Date.now()}-${Math.random()}`, file: f })),
    ]);
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function onDrop(targetIdx: number) {
    if (dragIdx.current === null || dragIdx.current === targetIdx) return;
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx.current!, 1);
      next.splice(targetIdx, 0, moved);
      return next;
    });
    dragIdx.current = null;
  }

  async function merge() {
    if (items.length < 2) { setError('Add at least 2 PDF files to merge.'); return; }
    setStatus('processing');
    setError(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const merged = await PDFDocument.create();
      for (const { file } of items) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const doc = await PDFDocument.load(bytes, { ignoreEncryption: false });
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const out = await merged.save({ useObjectStreams: true });
      downloadBytes(out, 'merged.pdf');
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Merge failed. The PDF may be encrypted or corrupted.');
      setStatus('error');
    }
  }

  const state: IrisState = status === 'processing' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label={`PDF Files${items.length ? ` (${items.length})` : ''}`}>
        <FileDropZone
          accept=".pdf,application/pdf"
          multiple
          onFiles={addFiles}
          label="Drop PDF files here, or click to browse"
          hint="Files stay on your device - nothing is uploaded"
        />
        {items.length > 0 && (
          <ul className="mt-2 space-y-1.5">
            {items.map((item, idx) => (
              <li
                key={item.id}
                draggable
                onDragStart={() => { dragIdx.current = idx; }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(idx)}
                className="flex items-center gap-2 rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-200 cursor-grab active:cursor-grabbing"
              >
                <GripVertical size={14} className="shrink-0 text-base-500" />
                <span className="flex-1 truncate">{item.file.name}</span>
                <span className="shrink-0 text-xs text-base-400">{(item.file.size / 1024).toFixed(0)} KB</span>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="ml-1 shrink-0 text-base-500 hover:text-error transition-colors"
                  aria-label={`Remove ${item.file.name}`}
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </ToolShellSection>

      <Button onClick={merge} disabled={items.length < 2 || status === 'processing'} className="w-full">
        <Combine size={16} />
        {status === 'processing' ? 'Merging...' : 'Merge & Download PDF'}
      </Button>
    </ToolShell>
  );
}
