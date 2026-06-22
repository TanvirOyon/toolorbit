import { cpSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';

const sourceDir = path.resolve('apps/web/dist/client');
const targetDir = path.resolve('dist');

if (!existsSync(sourceDir)) {
  console.error(`Expected build output at ${sourceDir}`);
  process.exit(1);
}

rmSync(targetDir, { recursive: true, force: true });
cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Prepared Cloudflare Pages output at ${targetDir}`);