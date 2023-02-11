<template>
    <div id="app">
        <div class="app_top">当输入框为空:输入框会发生抖动的现象</div>
        <el-input v-model="taskName" :class="{ 'apply-shake': shake }" /><br />
        <button @click="shakeAnimation()">
            Shake
        </button>
        <el-table :row-key="getRowKey" :default-sort="{ prop: 'price', order: 'descending' }" ref="multipleTableRef"
            @selection-change="handleSelectionChange"
            :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe
            style="width: 50%;height:540px;">
            <el-table-column :reserve-selection="true" type="selection" width="55" />
            <el-table-column prop="name" label="名字" width="180">
                <template #default="scope">
                    <div style="cursor:pointer;" @click="handleShake(scope.row)"
                        :class="{ 'apply-shake': scope.row.shake }">
                        {{ scope.row.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="small_image" label="图片" width="180">
                <!-- elementPlus的表格对的自定义的scope用#default定义 -->
                <template #default="scope">
                    <img style="width:100px;height:100px" :src="scope.row.small_image" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="price" label="价格" sortable />
            <el-table-column label="操作">
                <template #default="scope">
                    <div>
                        <el-button @click="handleAdd">增加</el-button>
                        <el-button>编辑</el-button>
                        <el-button>删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[4, 8, 12, 16]"
            :small="small" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        <dialogVue :isOpen="isOpen" v-if="isOpen"/>
    </div>
</template>

<script setup>
import axios from 'axios'
import dialogVue from './dialog.vue';
import { ref, onMounted } from 'vue'
const shake = ref(false);
const taskName = ref('')
const tableData = ref([])
const multipleSelection = ref([])
const total = ref(0)
const currentPage = ref(1);
const pageSize = ref(4);
const background = ref(false)
const small = ref(false)
const disabled = ref(false)
const isOpen = ref(false)
const multipleTableRef = ref(null)//取代之前通过ref绑定后这里使用$refs.table来操作bom元素this.$refs.table.toggleRowSelection(row);
const getNewList = () => axios.get('/public/db.json').then((res) => {
    tableData.value = res.data.imgs;
    total.value = res.data.imgs.length;
})
const handleSelectionChange = (val) => {
    console.log(val, '46**')
    multipleSelection.value = val;
}
const handleSizeChange = (val) => {
    currentPage.value = 1
    getNewList()
}
const handleCurrentChange = (val) => {
    currentPage.value = val
    getNewList()
}
const handleShake = (row) => {
    console.log(row, '64***')
    row.name === '手抓饼' ? row.shake = true : '';
    setTimeout(() => {
        row.shake = false;
    }, 820);
    multipleTableRef.value.toggleRowSelection(row);
}
// 保存选中的数据id,row-key就是要指定一个key标识这一行的数据
const getRowKey = (row) => {
    return row.id
}

const shakeAnimation = () => {
    taskName.value == '' ? shake.value = true : "";
    setTimeout(() => {
        shake.value = false;
    }, 820);
}
 const handleAdd =()=>{
    console.log("98***")
    isOpen.value = true
 }
onMounted(() => {
    getNewList()
})

</script>

<style lang="scss" scope>
@keyframes shake {

    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}

.apply-shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    border: 1px solid red;
}

.el-input {
    width: 50%;
}

.app_top {
    color: red;
}
</style>