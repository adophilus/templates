import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleX from 'vite-plugin-stylex'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true
    }),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']]
      }
    }),
    styleX()
  ]
})
