<template>
    <div>
       <!-- <slot name="one"></slot>
       <slot name="two"></slot> -->
       <!-- 添加slot用來占位内容的展示 -->
       <slot></slot>
       <div v-if="!('default' in $slots)">
        1236555
       </div>
       <div>
        {{ x }}:{{ y }}
       </div>
       <el-button>搜索</el-button>
       <el-button>重置</el-button>
    </div>
</template>

<script setup>
/* 引入$语法糖的路劲 */
import {$ref} from "vue/macros"
import { getCurrentInstance,defineExpose,ref } from 'vue';
const {proxy} = getCurrentInstance()
onMounted(() => {
    console.log(proxy.$slots)
    console.log(gg,'211***')
})
/* 一个$的符号把ref数据转换为reactive的响应式数据,不需要.value */
const gg =$ref(999);
/* $$把响应式转化为ref的方式 */
watch([$$(gg)],(val)=>{
    console.log(val,"30***first")
})
const ft =()=>{
    return {
        x:ref(5),
        y:ref(6)
    }
}
const {x,y} = $(ft())
const tt =()=>{
    console.log(gg)
}
const aa =ref("123");
const bb =()=>{
    console.log("23***")
}
function cc(){
    console.log('9999')
}
defineExpose({
    aa,bb,cc,tt
})
</script>

<style lang="scss" scoped>

</style>