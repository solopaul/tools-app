import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // 两种方式都可以
        additionalData: '@import "@/assets/scss/global.scss";'
        // additionalData: '@use "@/assets/scss/global.scss" as *;'
      }
    }
  }
})
