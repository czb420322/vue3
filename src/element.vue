<template>
    <div>
        <newShake />
        {{ count }}
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import newShake from './dialog/shake.vue'
import { useCounterStore } from './store';
const store =useCounterStore()
const {count}=storeToRefs(store)

</script>

<style lang="scss" scoped>

</style>