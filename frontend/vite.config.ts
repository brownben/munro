import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  server: {
    port: 8080,
  },

  build: {
    outDir: '../backend/dist/static',
    assetsDir: './',
    base: '/static',

    sourcemap: true,
  },
})
