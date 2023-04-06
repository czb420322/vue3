import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'; // 编辑器提示 path 模块找不到，可以cnpm i @types/node --dev 即可
// https://vitejs.dev/config/
import AutoImport from 'unplugin-auto-import/vite'//
export default defineConfig({
  plugins: [vue({
    reactivityTransform:true//$语法糖的开启
  }), AutoImport({ imports: ['vue', 'vue-router', 'vuex'] })],//可以自动导入vue的相关的api的函数
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')    // 配置别名；将 @ 指向'src'目录
    }
  },
  configureWebpack: {},
  server: {
    host: '0.0.0.0',
    port: 3000,       // 设置服务启动的端口号；如果端口已经被使用，Vite 会自动尝试下一个可用的端口
    open: false,       // 服务启动后自动打开浏览器
    proxy: {          // 代理
      '/api': {
        target: '真实接口服务地址',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')     // 注意代理地址的重写
      },
      // 可配置多个... 
    }
  }
})
