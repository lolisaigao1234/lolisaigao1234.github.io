/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
// import angular from '@analogjs/vite-plugin-angular';

// NOTE: Angular plugin disabled due to bug with test suite discovery
// See .gemini/VITEST_MIGRATION_NOTES.md for details
export default defineConfig(({ mode }) => ({
  plugins: [
    // angular({
    //   jit: true,
    //   tsconfig: './tsconfig.spec.json',
    // }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['setup-test.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.spec.ts',
        '**/*.config.ts',
        '**/index.ts',
      ],
    },
  },
}));
