<template>
    <div>
        <newShake />
        {{ count }}
        <input type="text" name="" id="input" autocomplete="off">
        <button @click="copyButton">复制</button>
        <el-input v-model="nums" />
        <el-button @click="handleBtn">确 定</el-button>
    </div>
    <el-button @click="generateExcel">导出</el-button>
    <button @click="exportExcel">导出表格</button>
    <div>
        <el-table ref='tableRef' row-key="id" @row-dragend="handleRowDrag" :data="tableDatas">
            <el-table-column prop="name" label="名字" :order="sortable"></el-table-column>
            <el-table-column prop="age" label="年龄" :order="sortable"></el-table-column>
            <el-table-column prop="address" label="地址" :order="sortable"></el-table-column>
        </el-table>
    </div>
    <div v-if=false>
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
import ExcelJS from 'exceljs';
const { proxy } = getCurrentInstance()
const store = useCounterStore()
const { count } = storeToRefs(store)
const nums = ref(null);
const tableRef = ref();

const columns = ref(['Column 3', 'Column 4'])// Add column headers here


const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Set up table headers
    worksheet.mergeCells('A1:F1');
    worksheet.getCell('A1').value = 'Table Header';

    worksheet.getCell('A2').value = 'Column 1';
    worksheet.getCell('B2').value = 'Column 2';

    let colIndex = 3;
    columns.value.forEach(col => {
        worksheet.getCell(`${getColumnName(colIndex)}2`).value = col + ' Upper';
        worksheet.getCell(`${getColumnName(colIndex + 1)}2`).value = col + ' Lower';
        colIndex += 2;
    });

    // Populate table data
    tableDataa.value.forEach((row, index) => {
        const rowIndex = index + 3; // Start from row 3
        worksheet.getCell(`A${rowIndex}`).value = row.column1;
        worksheet.getCell(`B${rowIndex}`).value = row.column2;

        colIndex = 3;
        columns.value.forEach(col => {
            worksheet.getCell(`${this.getColumnName(colIndex)}${rowIndex}`).value = row[col].upper;
            worksheet.getCell(`${this.getColumnName(colIndex + 1)}${rowIndex}`).value = row[col].lower;
            colIndex += 2;
        });
    });

    // Export workbook to Excel file
    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'table.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
const getColumnName = (index) => {
    let name = '';
    while (index > 0) {
        const modulo = (index - 1) % 26;
        name = String.fromCharCode(65 + modulo) + name;
        index = Math.floor((index - 1) / 26);
    }
    return name;
}
const generateTable = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // 设置表格数据
    worksheet.addRows(tableDataa.value);

    // 合并第一行的所有单元格并设置样式
    worksheet.mergeCells('A1:M1');
    const headerCell = worksheet.getCell('A1');
    headerCell.value = '表头';
    headerCell.font = { bold: true };
    headerCell.alignment = { vertical: 'middle', horizontal: 'center' };

    // 设置第二行的单元格样式
    worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('B2').alignment = { vertical: 'middle', horizontal: 'center' };

    // 设置从第三列开始的单元格样式
    for (let i = 0; i < 10; i++) {
        const column = String.fromCharCode(65 + i + 2); // A=65，因此第3列对应的字母是C
        const upperCell = worksheet.getCell(`C3:${column}3`);
        const lowerCell = worksheet.getCell(`C4:${column}4`);
        upperCell.alignment = { vertical: 'middle', horizontal: 'center' };
        lowerCell.alignment = { vertical: 'middle', horizontal: 'center' };
    }

    // // 将生成的表格导出为Excel文件
    // const buffer = XLSXStyle.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    // const blob = new Blob([buffer], { type: 'application/octet-stream' });
    // const url = URL.createObjectURL(blob);

    // // 创建一个新的a标签并模拟点击下载
    // const link = document.createElement('a');
    // link.style.display = 'none';
    // link.href = url;
    // link.setAttribute('download', 'table.xlsx');
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
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
/**
* 复制函数
* @param { string } text 需要复制的文本内容
* @returns { void }
*/
function copyToClipboard(text) {
    // 看当前需求，如果用户没有输入内容也能复制的话，就将 button 元素的 disabled 属性去掉，用户复制的就是空串；
    // 还有一种就是不禁用按钮，但是当用户没有输入内容就去点击复制的话，我们可以去给用户一个提示；

    // 创建元素
    const copyFrom = document.createElement('textarea');
    // 设置元素的内容
    copyFrom.value = text;
    // 将创建的元素添加到body中
    document.body.appendChild(copyFrom);
    // 选中元素
    copyFrom.select();
    // 执行复制命令，将文本添加到用户的剪贴板
    document.execCommand('copy');
    // 删除创建的元素
    document.body.removeChild(copyFrom);
}
function copyButton() {
    // // 获取 input 元素
    const input = document.querySelector('#input');

    // // 获取 button 按钮
    // const btn = document.querySelector('button');

    // // 给 button 元素 绑定事件
    // btn.addEventListener('click', () => {
        copyToClipboard(input.value);
        alert('复制成功！');
    // });
}




async function generateExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    const originData = [
        {
            areaName: "区域A",
            typeDataList: [
                {
                    name: "区域A-类型1",
                    contents: [
                        "区域A-类型1-数据1",
                        "区域A-类型1-数据2",
                        "区域A-类型1-数据3",
                        "区域A-类型1-数据4",
                    ],
                },
                {
                    name: "区域A-类型2",
                    contents: [
                        "区域A-类型2-数据1",
                        "区域A-类型2-数据2",
                        "区域A-类型2-数据3",
                        "区域A-类型2-数据4",
                    ],
                },
                {
                    name: "区域A-类型3",
                    contents: [
                        "区域A-类型3-数据1",
                        "区域A-类型3-数据2",
                        "区域A-类型3-数据3",
                        "区域A-类型3-数据4",
                    ],
                },
            ],
        },
        {
            areaName: "区域B",
            typeDataList: [
                {
                    name: "区域B-类型1",
                    contents: [
                        "区域B-类型1-数据1",
                        "区域B-类型1-数据2",
                        "区域B-类型1-数据3",
                        "区域B-类型1-数据4",
                    ],
                },
                {
                    name: "区域B-类型2",
                    contents: [
                        "区域B-类型2-数据1",
                        "区域B-类型2-数据2",
                        "区域B-类型2-数据3",
                        "区域B-类型2-数据4",
                    ],
                },
                {
                    name: "区域B-类型3",
                    contents: [
                        "区域B-类型3-数据1",
                        "区域B-类型3-数据2",
                        "区域B-类型3-数据3",
                        "区域B-类型3-数据4",
                    ],
                },
            ],
        },
        {
            areaName: "区域C",
            typeDataList: [
                {
                    name: "区域C-类型1",
                    contents: [
                        "区域C-类型1-数据1",
                        "区域C-类型1-数据2",
                        "区域C-类型1-数据3",
                        "区域C-类型1-数据4",
                    ],
                },
                {
                    name: "区域C-类型2",
                    contents: [
                        "区域C-类型2-数据1",
                        "区域C-类型2-数据2",
                        "区域C-类型2-数据3",
                        "区域C-类型2-数据4",
                    ],
                },
                {
                    name: "区域C-类型3",
                    contents: [
                        "区域C-类型3-数据1",
                        "区域C-类型3-数据2",
                        "区域C-类型3-数据3",
                        "区域C-类型3-数据4",
                    ],
                },
            ],
        },
    ];

    // 表头设置
    worksheet.getCell('A1').value = '';
    worksheet.getCell('B1').value = '';
    for (let i = 0; i < 24; i++) {
        const startTime = new Date();
        startTime.setHours(7 + i);
        const endTime = new Date(startTime.getTime() + 3600 * 1000);
        worksheet.getCell(1, i + 3).value = `${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`;
    }
    // 动态合并第一列并填充数据
    const dynamicData1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const dynamicRows1 = 8; // 第一列动态合并项1 每个合并块的行数
    let dynamicRowStart = 2;
    for (let i = 0; i < dynamicData1.length; i++) {
        worksheet.mergeCells(`A${dynamicRowStart}:A${dynamicRowStart + dynamicRows1 - 1}`);
        worksheet.getCell(`A${dynamicRowStart}`).value = dynamicData1[i];
        for (let j = 0; j < 8; j++) {
            const rowIndex = dynamicRowStart + j;
            worksheet.getCell(rowIndex, 2).value = dynamicData1[i];
            // 对应填充数据的表格从第三列开始
            // for (let k = 0; k < 24; k++) {
            //     worksheet.getCell(rowIndex, k + 3).value = 33;
            // }
            // for (let i = 0; i < 24; i++) {
            //     const data = `第${i + 1}个数据`; // 根据需要生成不同的数据
            //     for (let j = 0; j < dynamicData1.length; j++) {
            //         const rowIndex = dynamicRows1 * j + 2;
            //         worksheet.getCell(rowIndex, i + 3).value = data;
            //     }
            // }

        }
        dynamicRowStart += dynamicRows1;
    }
    // 固定展示八个数据，每8行空一行
    const fixedData = ['固定数据1', '固定数据2', '固定数据3', '固定数据4', '固定数据5', '固定数据6', '固定数据7', '固定数据8']
    const arr = [];
    for (let i = 0; i < dynamicData1.length; i++) {
        arr.push(fixedData)
    }
    console.log(arr.flat(Infinity))
    let brr = arr.flat(Infinity)
    for (let i = 0; i < brr.length; i++) {
        // const rowIndex = i * 9 + 2;
        const rowIndex = (i + 2);
        worksheet.getCell(rowIndex, 2).value = brr[i];
    }
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link for the Blob
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'table_data.xlsx';
    link.click();
    // 将 buffer 写入文件或提供下载等操作
    // fs.writeFileSync('filename.xlsx', buffer);
}
async function exportTable() {
    // Get table data
    const tableData = tableDatas.value;

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add a worksheet to the workbook
    const worksheet = workbook.addWorksheet('Sheet1');

    // Add headers to the worksheet
    const headerRow = worksheet.addRow(Object.keys(tableData[0]));

    // Set the style for the header row
    headerRow.eachCell((cell) => {
        cell.font = { bold: true };
    });

    // Add data rows to the worksheet
    tableData.forEach((row) => {
        worksheet.addRow(Object.values(row));
    });

    // Enable filtering on the header row
    worksheet.autoFilter = {
        from: { row: 1, column: 1 },
        to: { row: 1, column: Object.keys(tableData[0]).length },
    };

    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the buffer
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link for the Blob
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'table_data.xlsx';
    link.click();
}

const handleBtn = () => {
    // if (nums.value !== null && nums.value !== undefined && nums.value !== '') {
    //     console.log("19first")
    // }
    if ((nums.value ?? '') === '') {
        console.log("22first")
    }
}
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
    console.log(columnIndex, '70****')
    proxy.$set(columnOrder.value, columnIndex, order); // 更新columns数组的顺序
}
</script>

<style lang="scss" scoped></style>
