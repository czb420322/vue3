<template>
    <div>
        48778787
      {{ count }}
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import {useCounterStore} from "../store/index"
const store =useCounterStore()
const {count} = storeToRefs(store)
</script>

<style lang="scss" scoped>

</style>