<template>
  <div>
    <p>index</p>
    <button @click="toHome()">toHome</button>
    {{ count }}
    <vueStore />
    <el-button @click="handleAdd">加1</el-button>
  </div>

</template>
<script setup>
import vueStore from './vueStore/index.vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from "pinia";
import { useCounterStore } from "./store/index"
const store = useCounterStore()
//结构store的数据,变成响应式的数据
const { count } = storeToRefs(store)
const router = useRouter()
const toHome = (() => {
  router.push({
    name: 'home'
  })
})
const handleAdd=()=>{
  //获取store里面的方法
   store.add() 
}
</script>
<style  scoped>

</style>