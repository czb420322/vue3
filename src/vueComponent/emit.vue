<template>
    <button @click="toEmits">点击传到父组件</button>
  </template>
  
  <script  setup>
  import {defineEmits,ref} from 'vue'
  
  
  //先定义一下子 在发送值
  const  emits = defineEmits(['getChili']);
  
  const  toEmits = () => {
    emits('getChili','子的值')
  }
  
  </script>
  