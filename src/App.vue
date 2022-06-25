<template>
  <router-link to="/home">组件1</router-link>|
  <router-link to="/login">组件2</router-link>|
  <router-link to="/charts">组件3</router-link>
   <router-view></router-view>
  <!-- <h1>{{ msg }}</h1>
  <h1>{{ revseMsg(msg) }}</h1>
  <button @click="setMsg">点击修改</button>
  <img alt="Vue logo" src="./assets/logo.png" /> -->
</template>
<script setup>

import { ref } from 'vue'

let msg = ref("老城主帅!")
function revseMsg(value) {
  return value.split('').reverse().join('')
}
function setMsg() {

  msg.value = '老城年皮厚'
  console.log(msg, 'vgftfytft')
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
