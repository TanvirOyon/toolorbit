/**
 * Pure-JS MD5 (RFC 1321). Deliberately dependency-free: the `js-md5` npm
 * package's top-level Node-environment detection (`require('crypto')`,
 * `require('buffer')`) gets statically bundled by Vite and fails to
 * resolve inside the Cloudflare/workerd prerender sandbox, which has no
 * Node APIs unless `nodejs_compat` is explicitly enabled. This avoids that
 * entirely — MD5 is not used for anything security-sensitive here, just a
 * legacy checksum option alongside SHA-1/256/512.
 *
 * Verified against the standard RFC 1321 test vectors.
 */
export function md5(message: string): string {
  function rotl(x: number, c: number): number {
    return (x << c) | (x >>> (32 - c));
  }

  const s = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9,
    14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15,
    21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];

  const K = new Int32Array(64);
  for (let i = 0; i < 64; i++) {
    K[i] = (Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32) | 0) as number;
  }

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  const msg = new TextEncoder().encode(message);
  const origLenBits = BigInt(msg.length) * 8n;

  const withOne = new Uint8Array(msg.length + 1);
  withOne.set(msg);
  withOne[msg.length] = 0x80;

  let totalLen = withOne.length;
  while (totalLen % 64 !== 56) totalLen++;
  const padded = new Uint8Array(totalLen + 8);
  padded.set(withOne);

  new DataView(padded.buffer, totalLen, 8).setBigUint64(0, origLenBits, true);

  const view = new DataView(padded.buffer);

  for (let chunkStart = 0; chunkStart < padded.length; chunkStart += 64) {
    const M = new Int32Array(16);
    for (let j = 0; j < 16; j++) {
      M[j] = view.getInt32(chunkStart + j * 4, true);
    }

    let A = a0;
    let B = b0;
    let C = c0;
    let D = d0;

    for (let i = 0; i < 64; i++) {
      let F: number;
      let g: number;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      F = (F + A + K[i]! + M[g]!) | 0;
      A = D;
      D = C;
      C = B;
      B = (B + rotl(F, s[i]!)) | 0;
    }

    a0 = (a0 + A) | 0;
    b0 = (b0 + B) | 0;
    c0 = (c0 + C) | 0;
    d0 = (d0 + D) | 0;
  }

  function toHexLE(n: number): string {
    const buf = new ArrayBuffer(4);
    new DataView(buf).setInt32(0, n, true);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  return toHexLE(a0) + toHexLE(b0) + toHexLE(c0) + toHexLE(d0);
}
