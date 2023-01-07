<template>
  <div>
    <router-link style="width:20%" v-for="item in sd.list" :to="item.path">{{
      item.name
    }}</router-link>
    <router-view></router-view>
  </div>
  <!-- <h1>{{ msg }}</h1>
  <h1>{{ revseMsg(msg) }}</h1>
  <button @click="setMsg">点击修改</button>
  <img alt="Vue logo" src="./assets/logo.png" /> -->
</template>
<script setup>
import { ref, reactive } from "vue";
let msg = ref("老城主帅!");
function revseMsg(value) {
  return value.split("").reverse().join("");
}
function setMsg() {
  msg.value = "老城年皮厚";
  console.log(msg, "vgftfytft");
}
const sd = reactive({
  list: [
    {
      path: "/home",
      name: "地图",
    },
    {
      path: "/login",
      name: "首页",
    },
    {
      path: "/charts",
      name: "图表",
    },
  ],
});
</script>
<style lang="scss" scope>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  a {
    display: inline-block;
    // width: 20%;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    text-decoration: none;
  }
}
</style>
