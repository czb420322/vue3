import { createApp } from 'vue'
import App from './App.vue'
import { router } from './route/index'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
import $ from 'jquery'
import { createPinia } from 'pinia'
const pinia = createPinia();
const app = createApp(App)
app.config.globalProperties.$echarts = echarts;
app.use(router).use(ElementPlus, { locale }).use(pinia)
app.mount('#app')
// 全局修改默认配置，点击空白处不能关闭弹窗
app._context.components.ElDialog["props"].closeOnClickModal.default = false
// 全局修改默认配置，按下ESC不能关闭弹窗
app._context.components.ElDialog["props"].closeOnPressEscape.default = false