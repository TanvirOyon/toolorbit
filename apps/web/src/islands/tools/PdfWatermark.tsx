import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, Input, type IrisState } from '@toolorbit/ui';
import { Stamp } from 'lucide-react';

type Position = 'diagonal' | 'top' | 'bottom';

function downloadBytes(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function PdfWatermark() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [text, setText] = React.useState('CONFIDENTIAL');
  const [position, setPosition] = React.useState<Position>('diagonal');
  const [opacity, setOpacity] = React.useState(0.2);
  const [fontSize, setFontSize] = React.useState(48);
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
      setError('Could not read PDF.'); setStatus('error');
    }
  }

  async function watermark() {
    if (!file || !text.trim()) { setError('Enter watermark text.'); return; }
    setStatus('processing'); setError(null);
    try {
      const { PDFDocument, rgb, degrees, StandardFonts } = await import('pdf-lib');
      const doc = await PDFDocument.load(new Uint8Array(await file.arrayBuffer()));
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const pages = doc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        let x: number, y: number, rotate: number;
        if (position === 'diagonal') {
          x = width / 2 - textWidth / 2;
          y = height / 2 - fontSize / 2;
          rotate = 45;
        } else if (position === 'top') {
          x = width / 2 - textWidth / 2;
          y = height - fontSize - 20;
          rotate = 0;
        } else {
          x = width / 2 - textWidth / 2;
          y = 20;
          rotate = 0;
        }
        page.drawText(text, {
          x, y,
          font,
          size: fontSize,
          color: rgb(0.5, 0.5, 0.5),
          opacity,
          rotate: degrees(rotate),
        });
      }
      downloadBytes(await doc.save({ useObjectStreams: true }), `watermarked-${file.name}`);
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Watermark failed.'); setStatus('error');
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

      {status === 'ready' && <>
        <ToolShellSection label="Watermark text">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="CONFIDENTIAL" />
        </ToolShellSection>
        <ToolShellSection label="Position">
          <div className="flex gap-2">
            {(['diagonal', 'top', 'bottom'] as Position[]).map((p) => (
              <button key={p} type="button" onClick={() => setPosition(p)}
                className={`flex-1 rounded-md border py-2 text-sm font-medium capitalize transition-colors ${position === p ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
                {p}
              </button>
            ))}
          </div>
        </ToolShellSection>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-base-400 block mb-2">
              Opacity: {Math.round(opacity * 100)}%
            </label>
            <input type="range" min={5} max={80} value={Math.round(opacity * 100)}
              onChange={(e) => setOpacity(parseInt(e.target.value, 10) / 100)}
              className="w-full accent-interactive" />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-base-400 block mb-2">
              Font size: {fontSize}px
            </label>
            <input type="range" min={16} max={120} value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
              className="w-full accent-interactive" />
          </div>
        </div>
      </>}

      <Button onClick={watermark} disabled={status !== 'ready' || !text.trim()} className="w-full">
        <Stamp size={16} />
        {status === 'processing' ? 'Adding watermark…' : 'Add Watermark & Download'}
      </Button>
    </ToolShell>
  );
}
