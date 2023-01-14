<template>
  <div>
    <!-- vite.config配置@指向src目录下的文件的 -->
    <img src="@/assets/device/car.png" alt="">
    <div>
      {{ count }}
    </div>
    <div>
      {{ storeObj.name }}
    </div>
    <div>
      {{ storeObj.age }}
    </div>
    <div v-if="storeArray.length!=0?true:false"  v-for="item in store.storeArray">{{ item }}</div>
    <el-button @click="handleStore">修改store的单个基本数据</el-button>
    <el-button @click="handle_Reject">修改store的单个引用数据</el-button>
    <el-button @click="handleReset">清空全局的store的数据</el-button>
    <el-button @click="handlePush">初始化赋值给store</el-button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";//结构store的数据，让其具有响应式、
import { useCounterStore } from "@/store/index"
const array =reactive([1,2,3,4,5])
const store = useCounterStore()
const { count, storeObj,storeArray } = storeToRefs(store);
const handleStore = () => {
  store.$patch((state) => {//pinia一般推荐使用这种函数式的可以自定义的批量修改store的数据
    state.count += 3
    // count.value+=5
    console.log(state.count, '20***')
  })
}
const handle_Reject =()=>{
  store.$patch((state)=>{
    state.storeObj.name="小菠萝";
    state.storeObj.age=5;
   console.log(state.storeObj,'32****')
  })
}

const handleReset=()=>{//改函数初始化store仓库的数据设置的位初始值
  store.$reset()
}

const handlePush=()=>{
  store.$patch((state)=>{
    state.storeArray= array
    console.log(state,'49**')
  })
}
</script>

<style lang="scss" scoped>

</style>