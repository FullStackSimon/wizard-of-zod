import { defineConfig } from 'vitest/config'
import {fileURLToPath, URL} from "node:url";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            pinia: fileURLToPath(new URL('../../node_modules/pinia', import.meta.url)),
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest-setup.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules',
                'dist',
                'coverage',
                'tests',
                'src/components/ui/**',
                '*.config.{ts,js}',
                'src/*.ts',
            ],
        }
    },
})
