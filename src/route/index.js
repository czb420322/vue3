// @ts-nocheck
import { createRouter, createWebHashHistory } from "vue-router"

// @ts-ignore
const home = () => import('../home.vue')
// @ts-ignore
const login = () => import("../login.vue")

const charts =()=>import('../charts.vue')
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
  },{
      path:'/charts',
      name:'charts',
      component:charts,
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  // @ts-ignore
  routes: routes
})