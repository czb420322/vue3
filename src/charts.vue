<template>
  <div class="content">
    <!-- <button @click="increment">+1</button>
      {{ state.count }} -->
    <div class="leftDiv">
      <div class="leftDiv_top">
        <div class="leftDiv_top_left">
          <span>监控点名称:&nbsp;</span>
          <el-input />
        </div>
        <div class="leftDiv_top_right">
          <el-button type="primary">Primary</el-button>
          <el-button type="primary">Primary</el-button>
          <el-button type="primary">Primary</el-button>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, nextTick } from "vue";
const state = reactive({ count: 0 });
const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})
function mutateDeeply() {
  obj.nested.count++;
  obj.arr.push("baz")
}
function increment() {
  nextTick(() => {
    state.count++;
  });
}
</script>

<style lang="scss" scoped>
#chart {
  height: 400px;
}

.content {
  display: flex;
  border: 1px solid blue;

  .leftDiv {
    width: 440px;
    height: 160px;
    border: 1px solid red;

    .leftDiv_top {
      display: flex;
      height: 30px;
      padding: 0 10px;

      .leftDiv_top_left {
        display: flex;

        span {
          width: 92px;
        }

        .el-input {
          width: 100px;
        }
      }

      .leftDiv_top_right {
        display: flex;

        .el-button {
          width: 60px;
        }
      }
    }
  }
}</style>