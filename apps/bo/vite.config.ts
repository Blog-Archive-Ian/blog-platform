import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '.cert/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '.cert/localhost.pem')),
    },
  },
})
