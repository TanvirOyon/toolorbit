import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, Input, type IrisState } from '@toolorbit/ui';
import { Type } from 'lucide-react';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'diagonal';

const POSITIONS: { value: Position; label: string }[] = [
  { value: 'top-left',     label: 'Top Left'     },
  { value: 'top-right',    label: 'Top Right'    },
  { value: 'center',       label: 'Center'       },
  { value: 'bottom-left',  label: 'Bottom Left'  },
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'diagonal',     label: 'Diagonal'     },
];

export default function ImageWatermark() {
  const [file, setFile] = React.useState<File | null>(null);
  const [bmp, setBmp] = React.useState<ImageBitmap | null>(null);
  const [text, setText] = React.useState('© My Name');
  const [position, setPosition] = React.useState<Position>('bottom-right');
  const [fontSize, setFontSize] = React.useState(32);
  const [opacity, setOpacity] = React.useState(60);
  const [color, setColor] = React.useState('#ffffff');
  const [previewUrl, setPreviewUrl] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  async function loadFile(files: File[]) {
    const f = files[0]; if (!f) return;
    setFile(f); const b = await createImageBitmap(f); setBmp(b);
    const c = document.createElement('canvas'); c.width = b.width; c.height = b.height;
    c.getContext('2d')!.drawImage(b, 0, 0);
    c.toBlob((blob) => { if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(URL.createObjectURL(blob!)); });
    setStatus('idle'); setError(null);
  }

  function renderCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = bmp!.width; canvas.height = bmp!.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(bmp!, 0, 0);

    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textBaseline = 'middle';

    const pad = 16;
    const tw = ctx.measureText(text).width;
    const w = canvas.width; const h = canvas.height;

    if (position === 'diagonal') {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-Math.PI / 4);
      ctx.textAlign = 'center';
      ctx.fillText(text, 0, 0);
      ctx.restore();
    } else {
      let x = pad, y = fontSize / 2 + pad;
      if (position.includes('right')) x = w - tw - pad;
      if (position.includes('bottom')) y = h - fontSize / 2 - pad;
      if (position === 'center') { x = (w - tw) / 2; y = h / 2; }
      ctx.textAlign = 'left'; ctx.fillText(text, x, y);
    }
    ctx.globalAlpha = 1;
    return canvas;
  }

  function updatePreview() {
    if (!bmp) return;
    const canvas = renderCanvas();
    canvas.toBlob((blob) => { if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(URL.createObjectURL(blob!)); });
  }

  React.useEffect(() => { if (bmp) updatePreview(); }, [text, position, fontSize, opacity, color, bmp]);

  async function download() {
    if (!bmp || !file) return;
    setStatus('processing');
    const canvas = renderCanvas();
    const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    canvas.toBlob((blob) => {
      if (!blob) { setError('Export failed.'); setStatus('error'); return; }
      const base = file.name.replace(/\.[^.]+$/, '');
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = `watermarked-${base}.${mime === 'image/png' ? 'png' : 'jpg'}`; a.click();
      setStatus('done');
    }, mime, 0.93);
  }

  const state: IrisState = status === 'processing' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="Image">
        <FileDropZone accept="image/*" onFiles={loadFile} label="Drop an image here, or click to browse" hint="Files stay on your device" />
      </ToolShellSection>

      {bmp && <>
        {previewUrl && (
          <div className="flex justify-center rounded-lg border border-base-700 bg-base-900 p-3 max-h-56 overflow-hidden">
            <img src={previewUrl} alt="Preview" className="max-h-48 object-contain" />
          </div>
        )}
        <ToolShellSection label="Watermark text">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="© Your Name" />
        </ToolShellSection>
        <ToolShellSection label="Position">
          <div className="grid grid-cols-3 gap-1.5">
            {POSITIONS.map((p) => (
              <button key={p.value} type="button" onClick={() => setPosition(p.value)}
                className={`rounded-md border py-1.5 text-xs font-medium transition-colors ${position === p.value ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
                {p.label}
              </button>
            ))}
          </div>
        </ToolShellSection>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-base-400 block mb-1">Font size: {fontSize}px</label>
            <input type="range" min={10} max={120} value={fontSize} onChange={(e) => setFontSize(+e.target.value)} className="w-full accent-interactive" />
          </div>
          <div>
            <label className="text-xs text-base-400 block mb-1">Opacity: {opacity}%</label>
            <input type="range" min={5} max={100} value={opacity} onChange={(e) => setOpacity(+e.target.value)} className="w-full accent-interactive" />
          </div>
          <div>
            <label className="text-xs text-base-400 block mb-1">Color</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-full rounded cursor-pointer" />
          </div>
        </div>
      </>}

      <Button onClick={download} disabled={!bmp || !text.trim() || status === 'processing'} className="w-full">
        <Type size={16} />
        {status === 'processing' ? 'Exporting…' : 'Download Watermarked Image'}
      </Button>
    </ToolShell>
  );
}
