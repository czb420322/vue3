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
import {ref,onMounted } from 'vue'
import vueStore from './vueStore/index.vue'
import { useRouter ,useRoute} from 'vue-router'
import { storeToRefs } from "pinia";
import { useCounterStore } from "./store/index"
const store = useCounterStore()
//结构store的数据,变成响应式的数据
const { count } = storeToRefs(store)
const router = useRouter()
const route = useRoute()
onMounted(()=>{
  console.log(route.name,'24**')
})
const toHome = (() => {
  router.push({
    name: 'home',
    query:{
      menuCode:"701"
    }
  })
})
const handleAdd=()=>{
  //获取store里面的方法
   store.add() 
}
</script>
<style  scoped>

</style>