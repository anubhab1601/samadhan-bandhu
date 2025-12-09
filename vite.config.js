import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('src/features/central')) {
            return 'central';
          }
          if (id.includes('src/features/state')) {
            return 'state';
          }
          if (id.includes('src/features/sarpanch')) {
            return 'sarpanch';
          }
          if (id.includes('src/features/field-officer')) {
            return 'field-officer';
          }
          if (id.includes('src/features/agency')) {
            return 'agency';
          }
          if (id.includes('src/features/iva-officer')) {
            return 'iva-officer';
          }
        }
      }
    }
  }
})
