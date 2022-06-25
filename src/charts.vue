<template>
  <div>
    <button @click="increment">+1</button>
    {{ state.count }}
    <div>
        <div></div>
        <ul>
            <li></li>
        </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, nextTick } from "vue";
const state = reactive({ count: 0 });
const obj =reactive({
    nested:{count:0},
    arr:['foo','bar']
})
function mutateDeeply(){
    obj.nested.count++;
    obj.arr.push("baz")
}
function increment() {
  nextTick(() => {
    state.count++;
  });
}
</script>

<style  scoped>
#chart {
  height: 400px;
}
</style>