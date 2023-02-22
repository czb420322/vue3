<template>
    <div class="bigDialog">
        dsbijfhweijhiewhiuuewuiogjiwoeujiuoiujio
    </div>
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
    </el-dialog> --></template>

<script setup>
const sliderDialogVisible = ref(false);
const handleOpen = () => { };
const handleClose = () => { }
</script>

<style lang="scss" scoped>
.bigDialog {
    position: fixed;
    border: 1px solid red;
}
</style>