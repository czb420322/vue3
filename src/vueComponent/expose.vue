<template>
    <div>我是子组件333333 {{ xiaoZhi.stator }}</div>
</template>

<script  setup>
import { ref, defineExpose, reactive } from 'vue'
let xiaoZhi = reactive({
    stator: '小志',
    age: 27
})
let xiaoXiaoZhi = ref('小小志');
console.log(xiaoXiaoZhi)
const fun =()=>{
    console.log('子组件的方法')
}
defineExpose({
    xiaoZhi,
    xiaoXiaoZhi,
    fun
})
</script>
