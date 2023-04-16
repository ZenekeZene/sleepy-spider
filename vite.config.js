import { defineConfig } from 'vite'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: resolve(projectRootDir, 'src')
        }
      ]
    })
  ]
})
