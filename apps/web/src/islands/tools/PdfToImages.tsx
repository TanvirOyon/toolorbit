import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, type IrisState } from '@toolorbit/ui';
import { ImageIcon, Download } from 'lucide-react';

type OutputFormat = 'png' | 'jpeg';
type RenderedPage = { index: number; dataUrl: string; blob: Blob };

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

export default function PdfToImages() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pages, setPages] = React.useState<RenderedPage[]>([]);
  const [format, setFormat] = React.useState<OutputFormat>('png');
  const [dpi, setDpi] = React.useState(150);
  const [status, setStatus] = React.useState<'idle' | 'rendering' | 'done' | 'error'>('idle');
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  async function renderPdf(files: File[]) {
    const f = files[0]; if (!f) return;
    setFile(f); setPages([]); setStatus('rendering'); setError(null); setProgress(0);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
      const typedArray = new Uint8Array(await f.arrayBuffer());
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
      const scale = dpi / 72;
      const rendered: RenderedPage[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = vp.width; canvas.height = vp.height;
        const ctx = canvas.getContext('2d')!;
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
        const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), mimeType, 0.92));
        const dataUrl = canvas.toDataURL(mimeType, 0.92);
        rendered.push({ index: i, dataUrl, blob });
        setProgress(Math.round((i / pdf.numPages) * 100));
      }
      setPages(rendered);
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Rendering failed. The PDF may be encrypted or unsupported.');
      setStatus('error');
    }
  }

  function downloadAll() {
    pages.forEach((p) => downloadBlob(p.blob, `page-${p.index}.${format}`));
  }

  const state: IrisState = status === 'rendering' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <div className="flex gap-4 items-end flex-wrap">
        <ToolShellSection label="Output format" className="flex-1 min-w-[120px]">
          <div className="flex gap-2">
            {(['png', 'jpeg'] as OutputFormat[]).map((f) => (
              <button key={f} type="button" onClick={() => setFormat(f)}
                className={`flex-1 rounded-md border py-2 text-sm font-medium transition-colors ${format === f ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </ToolShellSection>
        <ToolShellSection label="DPI" className="flex-1 min-w-[120px]">
          <div className="flex gap-2">
            {[72, 150, 300].map((d) => (
              <button key={d} type="button" onClick={() => setDpi(d)}
                className={`flex-1 rounded-md border py-2 text-sm font-medium transition-colors ${dpi === d ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
                {d}
              </button>
            ))}
          </div>
        </ToolShellSection>
      </div>

      <ToolShellSection label="PDF File">
        <FileDropZone accept=".pdf,application/pdf" onFiles={renderPdf}
          label="Drop a PDF here, or click to browse"
          hint="PDF.js renders pages locally — no server" />
      </ToolShellSection>

      {status === 'rendering' && (
        <div className="space-y-2">
          <div className="h-1.5 rounded-full bg-base-800 overflow-hidden">
            <div className="h-full bg-interactive rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-center text-base-400">Rendering pages… {progress}%</p>
        </div>
      )}

      {pages.length > 0 && (
        <ToolShellSection label={`${pages.length} pages rendered`} action={
          <Button size="sm" variant="secondary" onClick={downloadAll}>
            <Download size={14} /> Download All
          </Button>
        }>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pages.map((p) => (
              <div key={p.index} className="group relative rounded-lg border border-base-700 overflow-hidden bg-base-900">
                <img src={p.dataUrl} alt={`Page ${p.index}`} className="w-full object-contain" />
                <button
                  type="button"
                  onClick={() => downloadBlob(p.blob, `page-${p.index}.${format}`)}
                  className="absolute inset-0 flex items-center justify-center bg-base-950/60 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Download size={20} className="text-base-50" />
                </button>
                <p className="absolute bottom-1 left-0 right-0 text-center text-xs text-base-400">Page {p.index}</p>
              </div>
            ))}
          </div>
        </ToolShellSection>
      )}
    </ToolShell>
  );
}
