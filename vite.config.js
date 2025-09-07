/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/BindingState.jsx'),
      name: 'react-binding-state',
      fileName: 'react-binding-state',
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
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      exclude: [
        'src/main.jsx',
        'src/index.js',
        'eslint.config.js',
        'vite.config.js',
        'dist/',
        'src/test/setup.js',
        'src/App.jsx',
        '**/*.bench.jsx',
      ],
    },
  },
});
