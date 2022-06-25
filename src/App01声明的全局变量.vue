<template>
<h1>{{msg}}</h1>
<h1>{{revseMsg(msg)}}</h1>
<button @click="setMsg"> 点击修改</button>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>
<script setup>
let msg ="老城主帅!"
function revseMsg(value){
  return value.split('').reverse().join('')
}
function setMsg(){
      msg= '老城年皮厚'
      console.log(msg,'vgftfytft')
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
