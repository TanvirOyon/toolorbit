import { defineConfig } from 'vitest/config';

// Deliberately minimal: we're unit-testing the pure logic functions
// exported from tool islands (e.g. CaseConverter's `convert`,
// BmiCalculator's `getCategory`), NOT rendering components - so no jsdom,
// no @testing-library. environment: 'node' is enough and keeps the suite
// fast. `esbuild.jsx: 'automatic'` lets vitest import the .tsx island
// files directly (they use the React 19 automatic JSX runtime) without
// pulling in @vitejs/plugin-react just for that.
export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
