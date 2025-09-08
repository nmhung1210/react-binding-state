/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ outDir: 'dist' })],
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/BindingState.tsx'),
      name: 'react-binding-state',
      fileName: (format) => `react-binding-state.${format === 'es' ? 'mjs' : 'umd.cjs'}`,
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8'
    }
  }
});
