<template>
 
        <el-table :data="tableData" height="250"  @row-dragend="handleRowDrag">
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope" #default="{ row ,$index}">
                    <el-button size="mini" icon="el-icon-bottom" :disabled="$index === tableData.length - 1"
                        @click="moveDown($index, row)">
                    </el-button>
                    <el-button size="mini" icon="el-icon-top" :disabled="$index === 0"
                        @click="moveUp($index, row)">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <pre style="text-align: left">
        {{ tableData }}
      </pre> -->

</template>
<script setup>
import { ref } from 'vue';
const tableData = ref(
    [
        {
            date: "2016-05-02",
            name: "王小虎1",
            address: "上海市普陀区金沙江路 100 弄",
        },
        {
            date: "2016-05-04",
            name: "王小虎2",
            address: "上海市普陀区金沙江路 200 弄",
        },
        {
            date: "2016-05-01",
            name: "王小虎3",
            address: "上海市普陀区金沙江路 300 弄",
        },
        {
            date: "2016-05-03",
            name: "王小虎4",
            address: "上海市普陀区金沙江路 400 弄",
        },
    ])
// 上移
const moveUp = (index, row) => {
    console.log("上移", index, row);
    if (index > 0) {
        const upDate = tableData.value[index - 1];
        tableData.value.splice(index - 1, 1);
        tableData.value.splice(index, 0, upDate);
    } else {
        alert("已经是第一条，不可上移");
    }
}
// 下移
const moveDown = (index, row) => {
    console.log("下移", index, row);
    if (index + 1 === tableData.value.length) {
        alert("已经是最后一条，不可下移");
    } else {
        const downDate = tableData.value[index + 1];
        tableData.value.splice(index + 1, 1);
        tableData.value.splice(index, 0, downDate);
    }
}
const handleRowDrag=(newIndex, oldIndex, row) =>{
    console.log(newIndex, oldIndex, row,'72***')
    // 处理行拖拽的逻辑
  }
</script>
  