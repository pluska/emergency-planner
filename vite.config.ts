import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/emergency-planner/', // This should match your repository name
  define: {
    'process.env': {
      GOOGLE_AI_API_KEY: JSON.stringify(process.env.VITE_OPENAI_API_KEY),
    }
  }
})
