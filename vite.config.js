import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/BindingState.jsx'),
      name: 'ReactBindingState',
      formats: ['es', 'umd'], // Explicitly define the formats
      // This function will generate the correct filenames
      fileName: (format) => `react-binding-state.${format === 'umd' ? 'umd.js' : 'mjs'}`,
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', 'prop-types'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'prop-types': 'PropTypes',
        },
      },
    },
  },
})
