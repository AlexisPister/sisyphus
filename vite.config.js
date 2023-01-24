import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import svgLoader from 'vite-svg-loader'
import manifest from './public/manifest.json' // Node 14 & 16
// import manifest from './public/manifest.json' assert { type: 'json' } // Node >=17

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      svgLoader(),
      crx({ manifest })
  ]
})
