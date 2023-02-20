<template>
    <div>
        <newShake />
        {{ count }}
        <el-input v-model="nums" />
        <el-button @click="handleBtn">确 定</el-button>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import newShake from './dialog/shake.vue'
import { useCounterStore } from './store';
const store = useCounterStore()
const { count } = storeToRefs(store)
const nums = ref(null);
const handleBtn = () => {
    if (nums.value !== null && nums.value !== undefined && nums.value !== '') {
        console.log("19first")
    }
    if ((nums.value ?? '') !== '') {
        console.log("22first")
    }
}
</script>

<style lang="scss" scoped></style>