import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/static' : '/',

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
    outDir: '../backend/dist/static',
    assetsDir: './',

    sourcemap: true,
  },
})
