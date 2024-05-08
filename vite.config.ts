import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueJsx(),
    ],
    base: './',
    server: {
      open: true,
      port: 8080,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //要跨域的地址
          target: 'https://mock.mengxuegu.com/mock/66384e30cab9671f88bd3027/api/v1',
          //是否允许跨域
          changeOrigin: true,
          //路径重写
          // rewrite: (path) => path.replace(/`^\${env.VITE_APP_BASE_API}`/, '')
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), '')
        }
      }


    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
