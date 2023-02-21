<template>
  <div>
    <router-link @click="handleClick(item.id)" :class='{ "active": now == item.id }' v-for="item in sd.list" :to="item.path">{{
      item.name
    }}</router-link>
    <!--分页组件显示中文名称需要在此处引入包裹 -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
<!-- <h1>{{ msg }}</h1> :class='now==item.id?"active":""'
  <h1>{{ revseMsg(msg) }}</h1>
  <button @click="setMsg">点击修改</button>
  <img alt="Vue logo" src="./assets/logo.png" /> --></template>
<script setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import { ref, reactive } from "vue";
const now = ref(1);
let msg = ref("老城主帅!");
function revseMsg(value) {
  return value.split("").reverse().join("");
}
function setMsg() {
  msg.value = "老城年皮厚";
  console.log(msg, "vgftfytft");
}
const handleClick = (val) => {
  now.value = val
}
const sd = reactive({

  list: [
    {
      id: 1,
      path: "/home",
      name: "地图",
    },
    {
      id: 2,
      path: "/login",
      name: "pinia",
    },
    {
      id: 3,
      path: "/charts",
      name: "图表",
    }, {
      id: 4,
      path: "/element",
      name: "表格",
    }, {
      id: 5,
      path: '/communication',
      name: "组件通信"
    }, {
      id: 6,
      path: '/vueuse',
      name: "vueHooks"
    }, {
      id: 7,
      path: '/vueTable',
      name: 'vueTable'
    }
  ],
});
</script>
<style lang="scss" scope>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  a {
    display: inline-block;
    margin: 0 20px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    text-decoration: none;
    color: #000;


  }

  .router-link-active {
    background-color: red;
  }

}
</style>
