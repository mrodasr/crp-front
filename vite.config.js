import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 8000,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5000',
                changeOrigin: false
            }
        }
    },
    build: {
        outDir: '../app/public',
        emptyOutDir: true
    }
})

export default config