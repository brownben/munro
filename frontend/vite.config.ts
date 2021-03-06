import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
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
