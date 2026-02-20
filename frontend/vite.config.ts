import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      // Liberando a rota de Cadastro
      '/signUp': {
        target: 'http://localhost:3333',
        changeOrigin: true,
      },
      // Liberando a rota de Login
      '/signIn': {
        target: 'http://localhost:3333',
        changeOrigin: true,
      },
      // Liberando a rota de buscar os dados do usuário (que o signIn usa logo depois)
      '/user': {
        target: 'http://localhost:3333',
        changeOrigin: true,
      }
    }
  }
})