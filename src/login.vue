<template>
  <div>
    <p>index</p>
    <button @click="toHome()">toHome</button>
    {{ count }}
    <vueStore />
    <el-button @click="handleAdd">加1</el-button>
    <div style="border: 1px solid red;">
      <el-button @click="handeAddTypes()">添加产品种类</el-button>
      <div v-for="item in cartList">{{ item.name }}</div>
    </div>
    <div>
      <el-button @click="handleOptions">添加声明式方法的数据</el-button>
      <div v-for="item in goodSum">{{ item.name }}</div>
      {{ sumData.name }}:{{ sumData.age }}是{{ isAdult }}:{{ sex }}:价格:{{ price }}:{{ setAge }}
      <el-button @click="clearSum"> 清空声明式的数据</el-button>
    </div>
  </div>
</template>
<script setup>
import { useSum } from "./store/calcSum"
import { useCartStore } from './store/newCart.js';
import { ref, onMounted, nextTick, reactive } from 'vue'
import vueStore from './vueStore/index.vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from "pinia";
import { useCounterStore } from "./store/index"
// import { structuredClone } from 'util';
const sumData = useSum();
const { goodSum } = sumData
const { sex, price, isAdult, setAge } = storeToRefs(sumData)
const cartData = useCartStore()
console.log(cartData, sex, '23***')
const { cartList } = storeToRefs(cartData);
// const cartList = computed(() => cartData.cartList)
// console.log(cartList, '27***')
const store = useCounterStore()
//结构store的数据,变成响应式的数据
const { count } = storeToRefs(store)
const router = useRouter()
const route = useRoute()
onMounted(() => {
  if (isStructuredCloneSupported()) {
    // 支持structuredClone函数，可以进行深拷贝操作
    deepClone(obj);
  } else {
    // 不支持structuredClone函数，需要使用其他方式进行深拷贝
    // 例如使用lodash的cloneDeep方法或fast-copy库等
    // ...
  }
  console.log(route.name, '24**')
})
let obj = reactive({

})

function isStructuredCloneSupported() {
  return typeof structuredClone === "function";
}
function deepClone(obj) {
  // 使用structuredClone进行深拷贝
  const clonedObject = structuredClone(obj);
  console.log(clonedObject);
}
const toHome = (() => {
  router.push({
    name: 'home',
    query: {
      menuCode: "701"
    }
  })
})
const handleAdd = () => {
  //获取store里面的方法
  store.add()
}
const handeAddTypes = () => {
  cartData.cartList.push({ name: "电脑" })
}
const handleOptions = () => {
  // goodSum.push({ name: "电脑" })
  sumData.$patch((state) => {
    console.log(state, '62***')
    state.age += 2;
    state.name = "张三",
      state.sex = "女"
  })
  sumData.calcPrice()
  sumData.getSex()
}
const clearSum = () => {
  sumData.name = ""
  sumData.age = 0;
  sex.value = "男";
  price.value = 0
  // sumData.$reset()
}
/* 简化复杂的if---else */

function routingJump(route_name) {
  const map = {
    home: () => console.log("跳转首页"),
    shop: () => console.log("生成随机数"),
    information: () => console.log("排序"),
    main: () => console.log("关闭页面"),
    course: () => console.log("打印"),
    activity: () => console.log("监听某些事"),
    help: () => console.log("......")
  }

  if (map[route_name]) {
    map[route_name](); // <-------------------这里要改为调用函数
  } else {
    console.log('不跳转页面');
  }
}

routingJump('shop'); // 生成随机数

function routingJump(route_name) {

  const map = [
    [
      () => route_name.includes('h'),
      () => console.log("跳转首页")
    ],
    [
      () => route_name.startsWith('s'),
      () => console.log("跳转购物页")
    ],
    [
      () => route_name.endsWith('n'),
      () => console.log("跳转资讯页")
    ],
    [
      () => route_name.includes('m') && !route_name.includes('d'),
      () => console.log("跳转我的")
    ],
    [
      () => route_name.includes('a') && route_name.length < 10,
      () => console.log("跳转活动页")
    ]
  ]

  const targetFn = map.find(item => item[0]());

  if (targetFn) {
    targetFn[1]()
  } else {
    console.log('不跳转页面');
  }
}

routingJump('activity'); // 跳转活动页


</script>
<style  scoped></style>