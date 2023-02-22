<template>
    <el-dialog class="bigDialog" @open="handleOpen" v-model="centerDialogVisible" title="弹窗" width="30%" center>
        <div>
            弹窗的主页面,需要使用的方法以已经注册到全局的main.js
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleClose()">
                   确 定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus'
const centerDialogVisible = ref(false);
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})
console.log(props.isOpen, '26**')
const handleClose = () => {
  ElMessageBox.confirm('你确认要关闭弹窗?')
    .then(() => {
    centerDialogVisible.value = false
    })
    .catch(() => {
      console.log('5455455445')
    })
}
const handleOpen = () => {
    centerDialogVisible.value = props.isOpen
}
onMounted(() => {
    handleOpen()
})
onBeforeUnmount(() => {
    centerDialogVisible.value = false
})
defineExpose({
    centerDialogVisible
})
</script>

<style lang="scss" scoped>
.el-dialog--center {
    width: 100%;
    height: 80%;
}
</style>