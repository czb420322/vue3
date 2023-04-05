<template>
    <div>
       <!-- <slot name="one"></slot>
       <slot name="two"></slot> -->
       <!-- 添加slot用來占位内容的展示 -->
       <slot></slot>
       <div v-if="!('default' in $slots)">
        1236555
       </div>
       <el-button>搜索</el-button>
       <el-button>重置</el-button>
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
const {proxy} = getCurrentInstance()
onMounted(() => {
    console.log(proxy.$slots)
})

</script>

<style lang="scss" scoped>

</style>