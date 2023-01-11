<template>
    <button @click="toEmits">点击传到父组件</button>
  </template>
  
  <script  setup>
  import {defineEmits,defineExpose} from 'vue'
  //先定义一下子 在发送值
  const  emits = defineEmits(['getChili']);
  const  toEmits = () => {
    emits('getChili','子的值')
  }
  const handleEmit =()=>{
    console.log("emit组件发出的数据信息")
  }
  defineExpose({
    handleEmit
  })
  </script>
  