import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: 'src/main.tsx',
      name: 'CustomComponents',
      // the proper extensions will be added
      fileName: 'customComponents',
    },
  },
}))
