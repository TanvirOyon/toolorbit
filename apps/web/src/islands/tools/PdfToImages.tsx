import * as React from 'react';
import { ToolShell, ToolShellSection, Button, FileDropZone, type IrisState } from '@toolorbit/ui';
import { ImageIcon, Download } from 'lucide-react';

type OutputFormat = 'png' | 'jpeg';
type RenderedPage = { index: number; dataUrl: string; blob: Blob };

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

export default function PdfToImages() {
  const [file, setFile]       = React.useState<File | null>(null);
  const [pages, setPages]     = React.useState<RenderedPage[]>([]);
  const [format, setFormat]   = React.useState<OutputFormat>('png');
  const [dpi, setDpi]         = React.useState(150);
  const [status, setStatus]   = React.useState<'idle' | 'rendering' | 'done' | 'error'>('idle');
  const [progress, setProgress] = React.useState(0);
  const [error, setError]     = React.useState<string | null>(null);

  async function renderPdf(files: File[]) {
    const f = files[0]; if (!f) return;
    setFile(f); setPages([]); setStatus('rendering'); setError(null); setProgress(0);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      // Self-hosted worker - loaded from the same origin, no CDN dependency.
      // The ?url suffix is a Vite directive that resolves to the content-hashed
      // asset path at build time, so the version always matches the installed package.
      const { default: workerUrl } = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

      const typedArray = new Uint8Array(await f.arrayBuffer());
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
      const scale = dpi / 72;
      const rendered: RenderedPage[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const vp   = page.getViewport({ scale });
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
      setError(e instanceof Error ? e.message : 'Rendering failed. The PDF may be encrypted or corrupted.');
      setStatus('error');
    }
  }

  function downloadAll() { pages.forEach((p) => downloadBlob(p.blob, `page-${p.index}.${format}`)); }

  const state: IrisState = status === 'rendering' ? 'processing' : status === 'done' ? 'complete' : status === 'error' ? 'error' : 'idle';

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="PDF File">
        <FileDropZone accept=".pdf,application/pdf" onFiles={renderPdf}
          label="Drop a PDF to convert, or click to browse"
          hint="Pages render locally - no upload needed" />
      </ToolShellSection>

      <ToolShellSection label="Output format">
        <div className="flex gap-2">
          {(['png', 'jpeg'] as const).map((f) => (
            <button key={f} type="button" onClick={() => setFormat(f)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${format === f ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </ToolShellSection>

      <ToolShellSection label={`DPI - ${dpi}`}>
        <input type="range" min={72} max={300} step={36} value={dpi}
          onChange={(e) => setDpi(Number(e.target.value))}
          className="w-full accent-interactive" />
        <div className="flex justify-between text-xs text-base-500 mt-1">
          <span>72 (screen)</span><span>150 (balanced)</span><span>300 (print)</span>
        </div>
      </ToolShellSection>

      {status === 'rendering' && (
        <p className="text-center text-sm text-base-300">Rendering… {progress}%</p>
      )}

      {pages.length > 0 && (
        <>
          <Button onClick={downloadAll} className="w-full">
            <Download size={16} /> Download All ({pages.length} {format.toUpperCase()} files)
          </Button>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {pages.map((p) => (
              <button key={p.index} type="button" onClick={() => downloadBlob(p.blob, `page-${p.index}.${format}`)}
                className="group relative overflow-hidden rounded-lg border border-base-700 hover:border-interactive/40 transition-colors">
                <img src={p.dataUrl} alt={`Page ${p.index}`} className="w-full" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center bg-base-950/70 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download size={20} className="text-interactive" />
                </div>
                <p className="absolute bottom-1 right-2 text-xs text-base-400">p.{p.index}</p>
              </button>
            ))}
          </div>
        </>
      )}
    </ToolShell>
  );
}
