<template>
    <div id="app">
        <div class="app_top">当输入框为空:输入框会发生抖动的现象</div>
        <el-input v-model="taskName" :class="{ 'apply-shake': shake }" /><br />
        <button @click="shakeAnimation()">
            Shake
        </button>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="name" label="名字" width="180" />
            <el-table-column prop="small_image" label="图片" width="180">
                <template #default="scope">
                    <img :src="scope.row.small_image" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="price" label="价格" />
        </el-table>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
let shake = ref(false);
let taskName = ref('')
let tableData = ref([])
const getNewList = () => axios.get('/public/db.json').then((res) => {
    // console.log(res, res.data.imgs, '19***')
    tableData.value = res.data.imgs;
})
onMounted(() => {
    getNewList()
})
let shakeAnimation = () => {
    taskName.value == '' ? shake.value = true : "";
    setTimeout(() => {
        shake.value = false;
    }, 820);
}
</script>

<style lang="scss" scope>
@keyframes shake {

    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}

.apply-shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    border: 1px solid red;
}

.el-input {
    width: 50%;
}

.app_top {
    color: red;
}
</style>