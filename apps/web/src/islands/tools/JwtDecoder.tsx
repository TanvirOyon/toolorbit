import * as React from 'react';
import { ToolShell, ToolShellSection, Textarea, Input, Badge, CopyButton, type IrisState } from '@toolorbit/ui';

function base64UrlDecode(segment: string): string {
  const padded = segment.replace(/-/g, '+').replace(/_/g, '/').padEnd(
    segment.length + ((4 - (segment.length % 4)) % 4),
    '='
  );
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}

interface Decoded {
  header: string;
  payload: string;
  signature: string;
  exp: number | null;
}

export default function JwtDecoder() {
  const [token, setToken] = React.useState('');

  const { decoded, error } = React.useMemo(() => {
    if (!token.trim()) return { decoded: null as Decoded | null, error: null as string | null };
    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      return { decoded: null, error: 'A JWT must have exactly 3 dot-separated parts (header.payload.signature).' };
    }
    try {
      const headerJson = JSON.parse(base64UrlDecode(parts[0]));
      const payloadJson = JSON.parse(base64UrlDecode(parts[1]));
      const exp = typeof payloadJson.exp === 'number' ? payloadJson.exp : null;
      return {
        decoded: {
          header: JSON.stringify(headerJson, null, 2),
          payload: JSON.stringify(payloadJson, null, 2),
          signature: parts[2],
          exp,
        },
        error: null,
      };
    } catch {
      return { decoded: null, error: 'Could not decode - header or payload isn\u2019t valid Base64URL-encoded JSON.' };
    }
  }, [token]);

  const state: IrisState = !token.trim() ? 'idle' : error ? 'error' : 'complete';

  const expiryBadge = React.useMemo(() => {
    if (!decoded || decoded.exp === null) return null;
    const isExpired = decoded.exp * 1000 < Date.now();
    const date = new Date(decoded.exp * 1000).toLocaleString();
    return { isExpired, date };
  }, [decoded]);

  return (
    <ToolShell state={state} error={error}>
      <ToolShellSection label="JWT">
        <Input
          placeholder="eyJhbGciOiJIUzI1NiIs…"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          spellCheck={false}
          className="font-mono"
        />
      </ToolShellSection>

      {decoded && (
        <>
          {expiryBadge && (
            <Badge variant={expiryBadge.isExpired ? 'error' : 'completion'}>
              {expiryBadge.isExpired ? 'Expired' : 'Valid until'} {expiryBadge.date}
            </Badge>
          )}

          <ToolShellSection label="Header" action={<CopyButton value={decoded.header} />}>
            <Textarea rows={4} readOnly value={decoded.header} className="font-mono" />
          </ToolShellSection>

          <ToolShellSection label="Payload" action={<CopyButton value={decoded.payload} />}>
            <Textarea rows={8} readOnly value={decoded.payload} className="font-mono" />
          </ToolShellSection>

          <ToolShellSection label="Signature (not verified)">
            <Textarea rows={2} readOnly value={decoded.signature} className="font-mono" />
          </ToolShellSection>
        </>
      )}
    </ToolShell>
  );
}
