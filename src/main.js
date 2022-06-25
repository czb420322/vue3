// @ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
import {router} from './route/index'
import * as echarts from 'echarts'
const app = createApp(App)
app.config.globalProperties.$echarts = echarts;
app.use(router)
app.mount('#app')
