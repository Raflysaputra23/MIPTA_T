import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/AIchat': {
        target: 'https://kizhbotz.online',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
