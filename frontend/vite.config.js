import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => ({
  plugins: [react()],

  // Local development (npm run dev)
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },

  // Production preview (npm run preview on Render)
  preview: {
    allowedHosts: [
      'contact-manager-frontend-d6w3.onrender.com'
    ]
  }
}))
