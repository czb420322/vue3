<template>
    <div style="border:1px solid red;">
        {{ msg }}
        <h1>父传子方法:</h1>
        <div>我是父组件----1</div>
        <props :title="msg" :tit="obj" />
    </div>
    <div style="border:1px solid blue;">
        <emit @getChili="getChili" />
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import props from './prop.vue'
import emit from './emit.vue';
//把值传递给子组件 ---> :title="msg"  <Home @getChili="getChili" :title="msg" />
const msg = ref('父的值')
const obj = reactive({
    name: "小王",
    age: 15
})
const getChili = (val) => {
    msg.value = val
    console.log(val, '23***')
}
</script>
