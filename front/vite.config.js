import { defineConfig } from 'vite'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    preserveSymlinks: true,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  optimizeDeps: {
    exclude: ['sleepy-spider-lib']
  },
  server: {
    port: 8000,
  },
  envDir: './config',
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: resolve(projectRootDir, './src')
        }
      ]
    })
  ]
})
