import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/customers': "http://localhost:8080",
      '/customerslisting': "http://localhost:5173"
    } 
  },
  plugins: [react()]
})