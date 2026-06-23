import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, type IrisState } from '@toolorbit/ui';
import { RotateCw, FlipHorizontal, FlipVertical, Download } from 'lucide-react';

type Op = { type: 'rotate'; deg: 90 | 180 | 270 } | { type: 'flipH' } | { type: 'flipV' };

function applyOps(bmp: ImageBitmap, ops: Op[]): HTMLCanvasElement {
  let canvas = document.createElement('canvas');
  canvas.width = bmp.width; canvas.height = bmp.height;
  let ctx = canvas.getContext('2d')!;
  ctx.drawImage(bmp, 0, 0);

  for (const op of ops) {
    const src = canvas;
    const out = document.createElement('canvas');
    if (op.type === 'rotate') {
      if (op.deg === 90 || op.deg === 270) { out.width = src.height; out.height = src.width; }
      else { out.width = src.width; out.height = src.height; }
      const c = out.getContext('2d')!;
      c.translate(out.width / 2, out.height / 2);
      c.rotate((op.deg * Math.PI) / 180);
      c.drawImage(src, -src.width / 2, -src.height / 2);
    } else {
      out.width = src.width; out.height = src.height;
      const c = out.getContext('2d')!;
      c.translate(op.type === 'flipH' ? src.width : 0, op.type === 'flipV' ? src.height : 0);
      c.scale(op.type === 'flipH' ? -1 : 1, op.type === 'flipV' ? -1 : 1);
      c.drawImage(src, 0, 0);
    }
    canvas = out;
  }
  return canvas;
}

export default function ImageRotateFlip() {
  const [file, setFile] = React.useState<File | null>(null);
  const [ops, setOps] = React.useState<Op[]>([]);
  const [previewUrl, setPreviewUrl] = React.useState('');
  const [bmp, setBmp] = React.useState<ImageBitmap | null>(null);
  const [status, setStatus] = React.useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  async function loadFile(files: File[]) {
    const f = files[0]; if (!f) return;
    setFile(f); setOps([]); setError(null); setStatus('idle');
    const b = await createImageBitmap(f);
    setBmp(b);
    const c = document.createElement('canvas');
    c.width = b.width; c.height = b.height; c.getContext('2d')!.drawImage(b, 0, 0);
    c.toBlob((blob) => { if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(URL.createObjectURL(blob!)); });
  }

  async function addOp(op: Op) {
    if (!bmp) return;
    const nextOps = [...ops, op];
    setOps(nextOps);
    const canvas = applyOps(bmp, nextOps);
    canvas.toBlob((blob) => { if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(URL.createObjectURL(blob!)); });
  }

  function reset() {
    if (!bmp) return;
    setOps([]);
    const c = document.createElement('canvas');
    c.width = bmp.width; c.height = bmp.height; c.getContext('2d')!.drawImage(bmp, 0, 0);
    c.toBlob((blob) => { if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(URL.createObjectURL(blob!)); });
  }

  async function download() {
    if (!bmp || !file) return;
    setStatus('processing');
    const canvas = applyOps(bmp, ops);
    const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    canvas.toBlob((blob) => {
      if (!blob) { setError('Export failed.'); setStatus('error'); return; }
      const ext = mime === 'image/png' ? 'png' : 'jpg';
      const base = file.name.replace(/\.[^.]+$/, '');
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `edited-${base}.${ext}`; a.click();
      setStatus('done');
    }, mime, 0.93);
  }

  const state: IrisState = status === 'processing' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="Image">
        <FileDropZone accept="image/*" onFiles={loadFile} label="Drop an image here, or click to browse" hint="Files stay on your device" />
      </ToolShellSection>

      {previewUrl && (
        <ToolShellSection label="Preview">
          <div className="flex justify-center rounded-lg border border-base-700 bg-base-900 p-4 overflow-hidden max-h-64">
            <img src={previewUrl} alt="Preview" className="max-h-56 object-contain" />
          </div>
        </ToolShellSection>
      )}

      {bmp && (
        <ToolShellSection label="Operations">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={() => addOp({ type: 'rotate', deg: 90 })}>
              <RotateCw size={14} /> Rotate 90°
            </Button>
            <Button size="sm" variant="secondary" onClick={() => addOp({ type: 'rotate', deg: 180 })}>
              <RotateCw size={14} /> 180°
            </Button>
            <Button size="sm" variant="secondary" onClick={() => addOp({ type: 'rotate', deg: 270 })}>
              <RotateCw size={14} className="scale-x-[-1]" /> 270°
            </Button>
            <Button size="sm" variant="secondary" onClick={() => addOp({ type: 'flipH' })}>
              <FlipHorizontal size={14} /> Flip H
            </Button>
            <Button size="sm" variant="secondary" onClick={() => addOp({ type: 'flipV' })}>
              <FlipVertical size={14} /> Flip V
            </Button>
            {ops.length > 0 && (
              <Button size="sm" variant="ghost" onClick={reset}>Reset</Button>
            )}
          </div>
          {ops.length > 0 && (
            <p className="mt-1.5 text-xs text-base-400">
              Applied: {ops.map((o, i) => (
                <span key={i}>{o.type === 'rotate' ? `Rotate ${o.deg}°` : o.type === 'flipH' ? 'Flip H' : 'Flip V'}{i < ops.length - 1 ? ' → ' : ''}</span>
              ))}
            </p>
          )}
        </ToolShellSection>
      )}

      <Button onClick={download} disabled={!bmp || !ops.length || status === 'processing'} className="w-full">
        <Download size={16} />
        {status === 'processing' ? 'Exporting…' : 'Download Edited Image'}
      </Button>
    </ToolShell>
  );
}
