import { createApp } from 'vue'
import App from './App.vue'
import { router } from './route/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
import {createPinia} from 'pinia'
const pinia = createPinia();
const app = createApp(App)
app.config.globalProperties.$echarts = echarts;
app.use(router).use(ElementPlus).use(pinia)
app.mount('#app')
