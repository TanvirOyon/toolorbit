import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, type IrisState } from '@toolorbit/ui';
import { ListOrdered, GripVertical, Trash2 } from 'lucide-react';

interface PageItem { originalIndex: number; label: string }

function downloadBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function PdfReorder() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pages, setPages] = React.useState<PageItem[]>([]);
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'ready' | 'processing' | 'done' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);
  const dragIdx = React.useRef<number | null>(null);
  const dragOverIdx = React.useRef<number | null>(null);

  async function loadFile(files: File[]) {
    const f = files[0]; if (!f) return;
    setFile(f); setStatus('loading'); setError(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(new Uint8Array(await f.arrayBuffer()));
      const count = doc.getPageCount();
      setPages(Array.from({ length: count }, (_, i) => ({ originalIndex: i, label: `Page ${i + 1}` })));
      setStatus('ready');
    } catch {
      setError('Could not read PDF. It may be encrypted or corrupted.'); setStatus('error');
    }
  }

  function onDragStart(idx: number) { dragIdx.current = idx; }
  function onDragOver(e: React.DragEvent, idx: number) { e.preventDefault(); dragOverIdx.current = idx; }
  function onDrop() {
    if (dragIdx.current === null || dragOverIdx.current === null || dragIdx.current === dragOverIdx.current) return;
    setPages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx.current!, 1);
      next.splice(dragOverIdx.current!, 0, moved);
      return next;
    });
    dragIdx.current = null; dragOverIdx.current = null;
  }
  function removePage(idx: number) {
    setPages((prev) => prev.filter((_, i) => i !== idx));
  }
  function reset() {
    if (!file) return;
    setPages((prev) => [...prev].sort((a, b) => a.originalIndex - b.originalIndex));
  }

  async function save() {
    if (!file || !pages.length) return;
    setStatus('processing'); setError(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const src = await PDFDocument.load(new Uint8Array(await file.arrayBuffer()));
      const out = await PDFDocument.create();
      const indices = pages.map((p) => p.originalIndex);
      const copied = await out.copyPages(src, indices);
      copied.forEach((p) => out.addPage(p));
      downloadBytes(await out.save({ useObjectStreams: true }), `reordered-${file.name}`);
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.'); setStatus('error');
    }
  }

  const state: IrisState =
    status === 'processing' || status === 'loading' ? 'processing'
    : status === 'done' ? 'complete'
    : status === 'error' ? 'error'
    : status === 'ready' ? 'complete'
    : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="PDF File">
        <FileDropZone accept=".pdf,application/pdf" onFiles={loadFile}
          label="Drop a PDF here, or click to browse" hint="Files stay on your device" />
        {file && status === 'ready' && (
          <p className="mt-1.5 text-xs text-base-400">{file.name} — {pages.length} pages remaining</p>
        )}
      </ToolShellSection>

      {pages.length > 0 && (
        <ToolShellSection
          label={`Page order (${pages.length} pages)`}
          action={
            <button type="button" onClick={reset}
              className="text-xs text-base-400 hover:text-base-200 transition-colors">
              Reset order
            </button>
          }
        >
          <ul className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {pages.map((page, idx) => (
              <li
                key={`${page.originalIndex}-${idx}`}
                draggable
                onDragStart={() => onDragStart(idx)}
                onDragOver={(e) => onDragOver(e, idx)}
                onDrop={onDrop}
                className="flex items-center gap-2 rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-200 cursor-grab active:cursor-grabbing select-none"
              >
                <GripVertical size={14} className="shrink-0 text-base-500" />
                <span className="flex-1">{page.label}</span>
                <span className="text-xs text-base-500">original #{page.originalIndex + 1}</span>
                <button type="button" onClick={() => removePage(idx)}
                  className="ml-1 shrink-0 text-base-500 hover:text-error transition-colors" aria-label="Remove page">
                  <Trash2 size={13} />
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-1.5 text-xs text-base-500">Drag rows to reorder. Click trash to exclude a page from the output.</p>
        </ToolShellSection>
      )}

      <Button onClick={save} disabled={status !== 'ready' || !pages.length} className="w-full">
        <ListOrdered size={16} />
        {status === 'processing' ? 'Saving…' : 'Save Reordered PDF'}
      </Button>
    </ToolShell>
  );
}
