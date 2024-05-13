import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(), 
    //Instead of bundling a .css file, inject the styles as <style> tags
    //This allows import of a single js file into html, with javascript injecting styles
    //We setup the id of the style tag to be 'custom-component-styles' so we can find it and copy it to shadow dom when necessary
    cssInjectedByJsPlugin({
      styleId: 'custom-component-styles',
    })
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'CustomComponents',
      fileName: 'customComponents',
    },
  },
}))
