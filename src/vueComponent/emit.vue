<template>
    <button @click="toEmits">点击传到父组件</button>
    <button @click="toSetEmit">点击传值</button>
  </template>
  
  <script  setup>
  //先定义一下子 在发送值
  const  emits = defineEmits(['getChili','setChil']);
  const  toEmits = () => {
    emits('getChili','第一个子组件的值')
  }
  const toSetEmit =()=>{
    emits('setChil','第二个子组件的数值')
  }
  const handleEmit =()=>{
    console.log("emit组件发出的数据信息")
  }

  defineExpose({
    handleEmit
  })
  </script>
  