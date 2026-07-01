import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, Input, type IrisState } from '@toolorbit/ui';
import { Crop } from 'lucide-react';

type Mode = 'resize' | 'crop';
type OutFmt = 'image/png' | 'image/jpeg' | 'image/webp';
const EXT: Record<OutFmt, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };

export default function ImageResizeCrop() {
  const [file, setFile] = React.useState<File | null>(null);
  const [origW, setOrigW] = React.useState(0);
  const [origH, setOrigH] = React.useState(0);
  const [mode, setMode] = React.useState<Mode>('resize');
  const [width, setWidth] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [lockAspect, setLockAspect] = React.useState(true);
  const [cropX, setCropX] = React.useState('0');
  const [cropY, setCropY] = React.useState('0');
  const [fmt, setFmt] = React.useState<OutFmt>('image/png');
  const [preview, setPreview] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  function loadFile(files: File[]) {
    const f = files[0]; if (!f) return;
    setFile(f);
    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      setOrigW(img.naturalWidth); setOrigH(img.naturalHeight);
      setWidth(String(img.naturalWidth)); setHeight(String(img.naturalHeight));
      URL.revokeObjectURL(url);
    };
    img.src = url;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
    setStatus('idle'); setError(null);
  }

  function onWidthChange(v: string) {
    setWidth(v);
    if (lockAspect && origW && origH) {
      const w = parseInt(v, 10);
      if (!isNaN(w)) setHeight(String(Math.round((w / origW) * origH)));
    }
  }
  function onHeightChange(v: string) {
    setHeight(v);
    if (lockAspect && origW && origH) {
      const h = parseInt(v, 10);
      if (!isNaN(h)) setWidth(String(Math.round((h / origH) * origW)));
    }
  }

  async function process() {
    if (!file) return;
    setStatus('processing'); setError(null);
    try {
      const bmp = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      if (mode === 'resize') {
        const w = Math.max(1, parseInt(width, 10) || origW);
        const h = Math.max(1, parseInt(height, 10) || origH);
        canvas.width = w; canvas.height = h;
        ctx.drawImage(bmp, 0, 0, w, h);
      } else {
        const cx = Math.max(0, parseInt(cropX, 10) || 0);
        const cy = Math.max(0, parseInt(cropY, 10) || 0);
        const cw = Math.max(1, parseInt(width, 10) || origW);
        const ch = Math.max(1, parseInt(height, 10) || origH);
        canvas.width = cw; canvas.height = ch;
        ctx.drawImage(bmp, cx, cy, cw, ch, 0, 0, cw, ch);
      }

      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, fmt, 0.92));
      if (!blob) throw new Error('Could not export image.');
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(blob));
      const base = file.name.replace(/\.[^.]+$/, '');
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = `${mode === 'resize' ? 'resized' : 'cropped'}-${base}.${EXT[fmt]}`; a.click();
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Processing failed.'); setStatus('error');
    }
  }

  const state: IrisState = status === 'processing' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="Image">
        <FileDropZone accept="image/*" onFiles={loadFile} label="Drop an image here, or click to browse" hint="Files stay on your device" />
        {file && <p className="mt-1.5 text-xs text-base-400">{file.name} - {origW}×{origH}px</p>}
      </ToolShellSection>

      <div className="flex gap-2">
        {(['resize', 'crop'] as Mode[]).map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)}
            className={`flex-1 rounded-md border py-2 text-sm font-medium capitalize transition-colors ${mode === m ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {mode === 'crop' && <>
          <ToolShellSection label="Crop X (px)"><Input value={cropX} onChange={(e) => setCropX(e.target.value)} placeholder="0" /></ToolShellSection>
          <ToolShellSection label="Crop Y (px)"><Input value={cropY} onChange={(e) => setCropY(e.target.value)} placeholder="0" /></ToolShellSection>
        </>}
        <ToolShellSection label={mode === 'resize' ? 'Width (px)' : 'Crop width (px)'}><Input value={width} onChange={(e) => onWidthChange(e.target.value)} placeholder="Width" /></ToolShellSection>
        <ToolShellSection label={mode === 'resize' ? 'Height (px)' : 'Crop height (px)'}><Input value={height} onChange={(e) => onHeightChange(e.target.value)} placeholder="Height" /></ToolShellSection>
      </div>

      {mode === 'resize' && (
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} className="accent-interactive" />
          <span className="text-sm text-base-300">Lock aspect ratio</span>
        </label>
      )}

      <ToolShellSection label="Output format">
        <div className="flex gap-2">
          {(['image/png', 'image/jpeg', 'image/webp'] as OutFmt[]).map((f) => (
            <button key={f} type="button" onClick={() => setFmt(f)}
              className={`flex-1 rounded-md border py-2 text-sm font-medium transition-colors ${fmt === f ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
              {EXT[f].toUpperCase()}
            </button>
          ))}
        </div>
      </ToolShellSection>

      <Button onClick={process} disabled={!file || status === 'processing'} className="w-full">
        <Crop size={16} />
        {status === 'processing' ? 'Processing…' : mode === 'resize' ? 'Resize & Download' : 'Crop & Download'}
      </Button>
    </ToolShell>
  );
}
