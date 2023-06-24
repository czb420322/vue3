<template>
    <!-- <div class="bigDialog" id="bigDialog">
        <Close class="close animated" @click="handleClose" />
        dsbijfhweijhiewhiuuewuiogjiwoeujiuoiujio
    </div> -->
    <!-- <el-dialog class="bigDialog" @open="handleOpen" v-model="sliderDialogVisible" title="弹窗" width="30%" center>
        <div>
            弹窗的主页面,需要使用的方法以已经注册到全局的main.js
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleClose">
                    确 定
                </el-button>
            </span>
        </template>
    </el-dialog> -->
</template>

<script setup>
import { useCounterStore } from '../store/index';
const emits = defineEmits(['handleClose'])
const store = useCounterStore()
const handleOpen = () => { };
const handleClose = () => {
emits('handleClose',false)
}
</script>

<style lang="scss" scoped>
@import url("@/assets/css/animate.css");

.bigDialog {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 100%;
    border: 1px solid red;
    z-index: 3;
    background-color: #b2b4a7;
    transition: all 5s ease-out;
    transition-property: width;
    transition-duration: 2s;

    // display: none;
    .close {
        font-size: 30px;
        position: fixed;
        right: 0;
        cursor: pointer;
    }
}
</style>