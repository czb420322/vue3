<template>
    <div style="border:1px solid red;">
        {{ msg }}
        <h1>父传子方法:</h1>
        <div>我是父组件----1</div>
        <props :title="msg" :tit="obj" />
    </div>
    <div style="border:1px solid blue;height:50px;line-height: 50px;">
        <emit @getChili="getChili" ref="handle_emit"/>
        <el-button @click="getEmit">获取emit的方法</el-button>
    </div>
    <div style="border:1px solid green;height: 100px;">
        <button @click="shiEmots">获取暴露</button>
        <exposes ref="shield" />
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import props from './prop.vue'
import emit from './emit.vue';
import exposes from './expose.vue';
const shield = ref()
const handle_emit = ref()
const shiEmots = () =>{
  console.log(shield,'24***')
  shield.value.fun()
  //子组件接收暴露出来得值
  console.log('接收reactive暴漏出来的值',shield.value.xiaoZhi)
  console.log('接收ref暴漏出来的值',shield.value.xiaoXiaoZhi)
}
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
const getEmit =()=>{
    handle_emit.value.handleEmit()
}
</script>
