// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // This allows the virtual import to work during "npm run dev"
      },
      manifest: {
        name: "Who's The Imposter",
        short_name: "Imposter",
        theme_color: '#0a0c10',
        background_color: '#0a0c10',
        display: 'standalone',
      }
    })
  ]
})