import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import autoprefixer from 'autoprefixer'
import { fileURLToPath, URL } from 'node:url'
import analyze from 'rollup-plugin-analyzer'
import tailwind from 'tailwindcss'

// Get dependencies from package.json
import pkg from './package.json'
import { visualizer } from "rollup-plugin-visualizer";

// Add all dependencies and peerDependencies as externals
const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  '@/components/ui/button',
  '@/components/ui/auto-form',
  '@/components/ui/card',
  '@/components/ui/table',
  '@/components/ui/auto-form/utils',
  '@/components/ui/progress',
  '@/components/ui/stepper',
  './components.json',
  './src/assets/',
  './src/components/ui/'
]

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: (format) => `wizard-of-zod.${format}.js`
    },
    rollupOptions: {
      external: externals,
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined
      },
      plugins: [
        analyze({ summaryOnly: true })
      ]
    },
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    vue(),
    dts({
      include: ['./src'],
      rollupTypes: true,
      insertTypesEntry: true
    }),
    visualizer({
      gzipSize: true,
      brotliSize: true
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      pinia: fileURLToPath(new URL('../../node_modules/pinia', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})