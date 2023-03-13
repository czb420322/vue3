<template>
  <div class="content">
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
  <div style="border:1px solid red;">
    <el-button @click=handleShow type="button" id="id-button-show">显示</el-button>
    <el-button @click="handleHide" type="button" id="id-button-hide">隐藏</el-button>
    <h3 class="h3-text">jQuery 效果 - 隐藏和显示</h3>
  </div>
  <div>
    <div class='panel'>
      <p>Eiege.com</p>
      <p>jquery专栏，学习和交流。Eiege专栏</p>
    </div>
    <p class='flip' @click="huadong">请点击这里</p>
  </div>
  <div>
    <el-input></el-input>
  </div>
</template>

<script setup>
import $ from 'jquery'
import { reactive, nextTick, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance()
const flag = ref(false)
const state = reactive({ count: 0 });
const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})
const handleShow = () => {
  $('.h3-text').show()
}
const handleHide = () => {
  $('.h3-text').hide()
}
const huadong = () => {
  $('.panel').slideToggle('slow');
}
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
}

.panel,
p.flip {
  margin: 0px;
  padding: 5px;
  text-align: center;
  background: #e5eecc;
  border: solid 1px #c3c3c3;
}

.panel {
  height: 120px;
  display: none;
}
</style>