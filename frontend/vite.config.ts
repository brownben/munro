import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [vue(), svgLoader()],
  base: '/',

  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false,
      },
    },
  },

  build: {
    outDir: './dist',
    assetsDir: './',
    emptyOutDir: true,
    sourcemap: true,
    polyfillDynamicImport: false,
  },
})
