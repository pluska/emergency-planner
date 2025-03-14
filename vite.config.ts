import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [react()],
    base: '/emergency-planner/', // This should match your repository name
    define: {
      'process.env': {
        GOOGLE_AI_API_KEY: JSON.stringify(env.VITE_OPENAI_API_KEY),
      }
    }
  }
})
