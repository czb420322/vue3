<template>
    <div>
        <newShake />
        {{ count }}
        <el-input v-model="nums" />
        <el-button @click="handleBtn">确 定</el-button>
    </div>
    <div>
        <el-table row-key="id" @row-dragend="handleRowDrag" :data="tableDatas">
            <el-table-column prop="name" label="名字" :order="sortable"></el-table-column>
            <el-table-column prop="age" label="年龄" :order="sortable"></el-table-column>
            <el-table-column prop="address" label="地址" :order="sortable"></el-table-column>
        </el-table>
    </div>
    <div>
        <el-table :data="tableData" @sort-change="handleSortChange">
            <el-table-column prop="column1" label="列1" :sortable="true" :order="columnOrder[0]"></el-table-column>
            <el-table-column prop="column2" label="列2" :sortable="true" :order="columnOrder[1]"></el-table-column>
            <el-table-column prop="column3" label="列3" :sortable="true" :order="columnOrder[2]"></el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { storeToRefs } from 'pinia';
import newShake from './dialog/shake.vue'
import { useCounterStore } from './store';
const {proxy}=getCurrentInstance()
const store = useCounterStore()
const { count } = storeToRefs(store)
const nums = ref(null);
const handleBtn = () => {
    // if (nums.value !== null && nums.value !== undefined && nums.value !== '') {
    //     console.log("19first")
    // }
    if ((nums.value ?? '') === '') {
        console.log("22first")
    }
}
const tableDatas = ref([{
    id: "1",
    name: "张三",
    age: 15,
    address: "天安门"
}, {
    id: "2",
    name: "张五",
    age: 16,
    address: "故宫"
}, {
    id: "3",
    name: "张七",
    age: 18,
    address: "紫禁城"
}]);
const handleRowDrag = (newIndex, oldIndex, row) => {
    console.log(newIndex, oldIndex, row)
    // 处理行拖拽的逻辑
}

const tableData = ref([
    { id: 1, column1: '数据1-1', column2: '数据1-2', column3: '数据1-3' },
    { id: 2, column1: '数据2-1', column2: '数据2-2', column3: '数据2-3' },
    { id: 3, column1: '数据3-1', column2: '数据3-2', column3: '数据3-3' },
])
const columnOrder = ref(['ascending', '', '']) // 设置初始排序顺序
const handleSortChange = ({ column, prop, order }) => {
    const columnIndex = tableData.value.findIndex(item => item.id === prop);
    console.log(columnIndex,'70****')
    proxy.$set(columnOrder.value, columnIndex, order); // 更新columns数组的顺序
}
</script>

<style lang="scss" scoped></style>