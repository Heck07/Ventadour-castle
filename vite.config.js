import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/Ventadour-castle/', // Remplace par le nom de ton repo GitHub
  plugins: [vue()],
  'process.env.NODE_ENV': '"development"'

})
