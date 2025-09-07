/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-binding-state/',
  plugins: [react()],
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
        '**/*.bench.jsx'
      ],
    }
  },
})
