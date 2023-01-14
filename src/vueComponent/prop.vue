<template>
  <div>我是子组件----2</div>
  <div style="color: red">{{ props.title }}</div>
  <div>{{ props.tit.age }}</div>
</template>

<script setup>
import { defineProps } from 'vue'
//接收父组件传过来的值！
const props = defineProps({
  title: {
    type: String
  },
  tit: {
    type: Object
  }
});
//打印一下 接收父组件的值
console.log(props.title, props.tit) //父的值
</script>