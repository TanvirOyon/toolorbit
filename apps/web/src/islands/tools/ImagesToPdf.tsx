import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, type IrisState } from '@toolorbit/ui';
import { FileImage, Trash2, GripVertical } from 'lucide-react';

interface ImgItem { id: string; file: File; preview: string }

function downloadBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

async function fileToEmbeddable(file: File): Promise<{ bytes: Uint8Array; type: 'jpg' | 'png' }> {
  if (file.type === 'image/jpeg') {
    return { bytes: new Uint8Array(await file.arrayBuffer()), type: 'jpg' };
  }
  const bmp = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bmp.width; canvas.height = bmp.height;
  canvas.getContext('2d')!.drawImage(bmp, 0, 0);
  const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), 'image/png'));
  return { bytes: new Uint8Array(await blob.arrayBuffer()), type: 'png' };
}

export default function ImagesToPdf() {
  const [items, setItems] = React.useState<ImgItem[]>([]);
  const [status, setStatus] = React.useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);
  const dragIdx = React.useRef<number | null>(null);

  function addFiles(files: File[]) {
    const imgs = files.filter((f) => f.type.startsWith('image/'));
    setItems((prev) => [
      ...prev,
      ...imgs.map((f) => ({ id: `${f.name}-${Date.now()}-${Math.random()}`, file: f, preview: URL.createObjectURL(f) })),
    ]);
  }

  function remove(id: string) {
    setItems((prev) => { const item = prev.find((p) => p.id === id); if (item) URL.revokeObjectURL(item.preview); return prev.filter((p) => p.id !== id); });
  }

  function onDrop(targetIdx: number) {
    if (dragIdx.current === null || dragIdx.current === targetIdx) return;
    setItems((prev) => { const next = [...prev]; const [m] = next.splice(dragIdx.current!, 1); next.splice(targetIdx, 0, m); return next; });
    dragIdx.current = null;
  }

  async function convert() {
    if (!items.length) { setError('Add at least one image.'); return; }
    setStatus('processing'); setError(null);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.create();
      for (const { file } of items) {
        const { bytes, type } = await fileToEmbeddable(file);
        const img = type === 'jpg' ? await doc.embedJpg(bytes) : await doc.embedPng(bytes);
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      downloadBytes(await doc.save({ useObjectStreams: true }), 'images.pdf');
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed.'); setStatus('error');
    }
  }

  const state: IrisState = status === 'processing' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label={`Images${items.length ? ` (${items.length})` : ''}`}>
        <FileDropZone accept="image/jpeg,image/png,image/webp,image/*" multiple onFiles={addFiles}
          label="Drop JPG, PNG, or WebP images here"
          hint="Each image becomes one page — drag to reorder" />
        {items.length > 0 && (
          <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
            {items.map((item, idx) => (
              <div key={item.id} draggable
                onDragStart={() => { dragIdx.current = idx; }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(idx)}
                className="group relative rounded-lg border border-base-700 overflow-hidden cursor-grab active:cursor-grabbing bg-base-900">
                <img src={item.preview} alt={item.file.name} className="h-20 w-full object-cover" />
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-1 py-0.5 bg-base-950/60">
                  <GripVertical size={12} className="text-base-300" />
                  <button type="button" onClick={() => remove(item.id)} className="text-base-300 hover:text-error transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
                <p className="absolute bottom-0 left-0 right-0 bg-base-950/60 text-center text-xs text-base-300 py-0.5 truncate px-1">{idx + 1}</p>
              </div>
            ))}
          </div>
        )}
      </ToolShellSection>
      <Button onClick={convert} disabled={!items.length || status === 'processing'} className="w-full">
        <FileImage size={16} />
        {status === 'processing' ? 'Converting…' : 'Convert to PDF & Download'}
      </Button>
    </ToolShell>
  );
}
