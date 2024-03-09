import { createRouter, createWebHashHistory } from "vue-router"
const home = () => import('../home.vue')
const login = () => import("../login.vue")
const element = () => import('../element.vue')
const charts = () => import('../charts.vue')
const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: home
  },
  {
    path: "/login",
    name: "login",
    component: login
  }, {
    path: '/charts',
    name: 'charts',
    component: charts,
  }, {
    path: '/element',
    name: 'element',
    component: element,
  }, {
    path: '/communication',
    name: 'communication',
    component: () => import('../communication.vue')
  }, {
    path: '/vueuse',
    name: 'vueuse',
    component: () => import('../vueUse.vue')
  }, {
    path: '/vueTable',
    name: 'vueTable',
    component: () => import('../dialog/table.vue')
  }, {
    path: '/animate',
    name: 'animate',
    component: () => import('../animate.vue')
  }, {
    path: '/componentcommunication',
    name: 'componentcommunication',
    component: () => import('../componentCommunication/index.vue')
  }, {
    path: '/searchHight',
    name: 'searchHight',
    component: () => import('../searchHight.vue')
  }, {
    path: '/echratsTable',
    name: 'echratsTable',
    component: () => import('../echartsTable.vue')
  
  }, {
    path: '/elMain',
    name: 'elMain',
    component: () => import('../elMain.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  // @ts-ignore
  routes: routes
})