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
    总数：{{ cartData.allNum}}
    <div v-for="{ name } in cartData.cartList">
      {{ name }}
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
  <div v-for="{ id, name } in newData" :key="name + 1">
    {{ id }} : {{ name }}
  </div>
  <div>
    <newSlot ref="lg">
      <!-- 用来展示组件的slot的内容的信息-->
      <span>名字:</span>
      <el-input />
      <!-- <span slot="centers">1233555</span> -->
    </newSlot>
  </div>
  <div>
    <el-button @click="changeFlag">显示</el-button>
    <el-dialog v-model="statu" title="Warning" width="30%" align-center>
      <span>Open the dialog from the center from the screen</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="statu = false">Cancel</el-button>
          <el-button type="primary" @click="statu = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useCartStore } from "./store/newCart.js";
import { statu, changeFlag } from "./globalMix/index"
import $ from 'jquery'
import { reactive, nextTick, getCurrentInstance, onMounted } from "vue";
import newSlot from './components/slot.vue';
const cartData = useCartStore()
const newData = reactive([
  {
    id: 1,
    name: "老王"
  }, {
    id: 2,
    name: "小王"
  }
])
const { proxy } = getCurrentInstance()
const flag = ref(false)
const lg = ref(null)
onMounted(() => {
  console.log(lg.value.aa, lg.value.tt);
  lg.value.bb();
  lg.value.cc()
})
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

.dialog-footer button:first-child {
  margin-right: 10px;
}

.el-overlay-dialog {
  :deep(.el-dialog__title) {
    text-align: left;
  }
}
</style>