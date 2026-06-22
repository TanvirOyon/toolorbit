import * as React from 'react';
import { UploadCloud } from 'lucide-react';
import { cn } from '../cn.js';

export interface FileDropZoneProps {
  accept?: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  label?: string;
  hint?: string;
  className?: string;
}

/**
 * Reusable drag-and-drop file input. Not used by any Phase 0 tool (all of
 * them are text-in/text-out), but wired up now so Phase 1 PDF/Image
 * modules can drop it in without rebuilding the interaction.
 */
export function FileDropZone({
  accept,
  multiple = false,
  onFiles,
  label = 'Drop files here, or click to browse',
  hint,
  className,
}: FileDropZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    onFiles(Array.from(fileList));
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center cursor-pointer transition-colors duration-150',
        isDragging
          ? 'border-interactive bg-interactive-muted'
          : 'border-base-700 hover:border-base-600 bg-base-900',
        className
      )}
    >
      <UploadCloud size={28} className="text-base-400" aria-hidden />
      <p className="text-sm text-base-200">{label}</p>
      {hint ? <p className="text-xs text-base-400">{hint}</p> : null}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
