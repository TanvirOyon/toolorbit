import { useCallback, useState } from 'react';

export function useCopyToClipboard(resetAfterMs = 1500) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), resetAfterMs);
      } catch {
        // Clipboard API can fail in insecure contexts / older browsers -         // fail silently rather than throwing in a tool widget.
        setCopied(false);
      }
    },
    [resetAfterMs]
  );

  return { copied, copy };
}
