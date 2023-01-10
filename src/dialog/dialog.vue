<template>
    <el-dialog @open="handleOpen" v-model="centerDialogVisible" title="弹窗" width="30%" center>
       <div> 
       </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref} from 'vue';
const centerDialogVisible= ref(false);
const props= defineProps('isOpen')
console.log(props,'21**')
const handleOpen = ()=>{
    centerDialogVisible.value = props
}
</script>

<style lang="scss" scoped>

</style>