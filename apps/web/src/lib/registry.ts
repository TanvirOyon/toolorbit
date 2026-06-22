// The actual merge-all-tools-packages logic lives in @toolorbit/tool-registry
// (packages/tool-registry/src/index.ts) so it can be unit tested in
// isolation. This file just re-exports it under a shorter app-local path.
export * from '@toolorbit/tool-registry';
