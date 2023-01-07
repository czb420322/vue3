/*
 * @Author: czb420322 2751470984@qq.com
 * @Date: 2023-01-07 15:40:15
 * @LastEditors: czb420322 2751470984@qq.com
 * @LastEditTime: 2023-01-07 15:50:24
 * @FilePath: \vue3\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'; // 编辑器提示 path 模块找不到，可以cnpm i @types/node --dev 即可
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')    // 配置别名；将 @ 指向'src'目录
    }
  },
  server: {
    host:'0.0.0.0',
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
