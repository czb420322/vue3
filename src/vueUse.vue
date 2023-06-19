<!-- <template>
    <div>
        {{ sd }}
    </div>
</template>

<script setup>
const sd = ref("123")
</script>

<style lang="scss" scoped>

</style> -->

<template>
    <div class="query-wrapper">
        <el-row type="flex" justify="space-between">
            <el-col :span="5">
                <span class="query-label">关键字：</span>
                <el-input v-model="txtSearch" placeholder="请输入关键字" clearable />
            </el-col>
            <el-col :span="5" style="align-items: flex-start">
                <span class="query-label">标签：</span>
                <el-popover ref="popoverTags" v-scoped="this" placement="bottom-start" transition="transition-popover-tb"
                    :visible-arrow="true" popper-class="popover-tags" width="201" trigger="click"
                    @show="tagsPopoverShowing = true" @hide="tagsPopoverShowing = false">
                    <div style="">
                        <el-checkbox-group v-model="checkedTags">
                            <el-checkbox v-for="(tag) in allTags" :key="tag.id" :label="tag.id" class="tag-item">{{ tag.name
                            }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <el-button slot="reference" class="dis-btn-hover">
                        <!-- <span style="font-weight: bold; margin-right: 8px;">标签</span> -->
                        <div style="display:inline-block; width: 100px;">
                            <span v-show="!checkedTags || checkedTags.length === 0" style="color: var(--color-fontb9)">
                                请选择
                            </span>
                            <span v-show="checkedTags && checkedTags.length > 0">
                                <span style="">已选</span>
                                <span> ( {{ checkedTags.length }} ) </span>
                                <!-- <span class="blue-badge">{{ checkedTags.length }}</span> -->
                            </span>
                        </div>
                        <i v-if="checkedTags && checkedTags.length > 0" class="el-icon-circle-close tag-popover-close"
                            style="margin-left: 12px;" @click.stop="checkedTags = []" />
                        <i v-else class="el-icon-arrow-down tag-popover-arrow" :class="{ 'opening': tagsPopoverShowing }"
                            style="margin-left: 12px;" />
                    </el-button>
                </el-popover>
            </el-col>
            <el-col :span="6">
                <span class="query-label">地址：</span>
                <el-input v-model="addrSearch" placeholder="模糊匹配地址" clearable />
            </el-col>
            <el-col :span="3" style="align-items: flex-start">
                <span class="query-label">&nbsp;</span>
                <el-button type="primary">查询</el-button>
            </el-col>
        </el-row>
        <div>
            <el-button @click="handleCase">级联选择器</el-button>
        </div>
        <caseCader v-if="flag" />
        <div id="main" style="width: 100%; height: 500px"></div>
    </div>
</template>

<script setup>
import caseCader from './caseCader/index.vue';
import { getCurrentInstance, ref } from 'vue';
const { proxy } = getCurrentInstance()
let myEcharts = proxy.$echarts;
const txtSearch = ref('');
const addrSearch = ref('');
const tagsPopoverShowing = ref(true);
const flag = ref(false)
const checkedTags = ref([]);
const handleCase = () => {
    flag.value = true;
}
const allTags = ref([
    { name: '豪华型', id: 0 },
    { name: '中型', id: 1 },
    { name: '混合动力车', id: 2 },
    { name: '后驱', id: 3 },
    { name: '汽油车', id: 4 },
    { name: '奔驰', id: 5 },
    { name: '跑车', id: 6 },
    { name: '油耗高', id: 7 },
    { name: '商用车', id: 8 },
    { name: 'SUV', id: 9 },
    { name: '前驱', id: 10 },
    { name: '轿车', id: 11 }
])

/* ------- 如何处理原始数据把它去重分类，集中在一个数组里面*/
let arr = reactive([
    { type: "M", xdata: "2023-06", LotType: "C", target: "200", wip: "200" },
    { type: "M", xdata: "2023-06", LotType: "D", target: "200", wip: "400" },
    { type: "M", xdata: "2023-06", LotType: "S", target: "200", wip: "400" },
    { type: "D", xdata: "20230615", LotType: "D", target: "100", wip: "100" },
    { type: "W", xdata: "202323", LotType: "D", target: "100", wip: "300" },
    { type: "W", xdata: "202324", LotType: "D", target: "500", wip: "100" },
    { type: "W", xdata: "202323", LotType: "S", target: "500", wip: "100" },
    { type: "D", xdata: "20230617", LotType: "S", target: "100", wip: "400" },
    { type: "D", xdata: "20230617", LotType: "P", target: "100", wip: "400" }
]);
const W = [];
const D = [];
const M = [];
arr.map(i => {
    if (i.type === "W") {
        W.push(i);
    }
    if (i.type === "D") {
        D.push(i);
    }
    if (i.type === "M") {
        M.push(i);
    }
});
function aa(data) {
    return (data).map(({ LotType, wip }) => [LotType, wip])
}
let w1 = aa(W);
let m1 = aa(M);
let d1 = aa(D);
// console.log(w1, m1, d1, '128****')
const newData = [...w1, ...m1, ...d1];
console.log(newData, '140新的融合数据')
/* ------------- -------生成一个新的去重后的数据结束*/
/* 数组转换[['D', '300'],['D', '100'],['S', '100'],['S', '400']]如何转换成[['D',['100','300']],['S',['100','400']]] */
const zhuanMap = new Map();
newData.forEach(([key, val]) => {
    const values = zhuanMap.get(key) || [];
    zhuanMap.set(key, [...values, val]);
});
const result = [...zhuanMap].map(([key, values]) => [key, values]);
console.log(result, '152转换的数据')
const arr1 = [{
    name: "Plan", data: [800, 100, 700, 600],
    type: "bar",
    barWidth: 37.25,
}];
const resultss = result.reduce((acc, [key, values]) => {
    const item = arr1.find(item => item.name === key);
    if (item) {
        acc.push({ name: item.name, type: "bar", stack: "stack", data: [...item.data, ...values] });
    } else {
        acc.push({
            name: key, type: "bar",
            data: values, stack: "stack", barWidth: 37.25
        });
    }
    return acc;
}, [...arr1]);

console.log(resultss, '164****');


/* x轴数据如何生成 ----------*/
function fn3(tempArr) {
    let result = [];
    let obj = {};
    for (let i = 0; i < tempArr.length; i++) {
        if (!obj[tempArr[i].xdata]) {
            result.push(tempArr[i]);
            obj[tempArr[i].xdata] = true;
        };
    };
    return result;
};
let xdata = fn3(arr).map(obj => obj.xdata);
const compareStrNums = (a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''));
    const numB = parseInt(b.replace(/\D/g, ''));
    return numA - numB;
}
xdata.sort(compareStrNums);
console.log(xdata, '134**X周数据')
/* ---------- */
onMounted(() => {
    var myChart = myEcharts.init(document.getElementById('main'));
    var option = {
        color: ['#afabab', '#93beff', '#ffc63a', '#1d4edf', '#383b96'],
        legend: {
            right: 0
        },
        title: {
            text: 'waferStart',
            left: 'center'
        },
        grid: {
            left: '4%',
            right: '4%',
            bottom: '5%',
            top: '12%',
            containLabel: true
        },
        xAxis: [
            {
                name: '月份',
                type: 'category',
                axisTick: {
                    alignWithLabel: false
                },
                axisLabel: {
                    padding: [25, 0, 0, 0]
                },
                data: xdata
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: function (params) {
                        return params + '%';
                    }
                }
            }
        ],
        series: resultss
    };
    myChart.setOption(option);
})
</script>

<style lang="scss" scoped>
.query-wrapper {
    --color-font2: #595959;
    --color-fontb9: #b9b9b9;
    --content-padding: 16px;
    margin-bottom: var(--content-padding);
    padding-bottom: var(--content-padding);
    border-bottom: 1px solid #F5F5F5;

    .query-label {
        font-size: 13px;
        color: var(--color-font2);
        cursor: default;
    }

    .date-split {
        text-align: center;
        line-height: 32px;
        font-size: 13px;
        color: var(--color-font2);
    }

    >.el-row {
        margin-bottom: 12px;

        >.el-col {
            display: flex;
            flex-direction: column;
        }
    }

    .query-line-height {
        .el-radio {
            line-height: 32px;
        }
    }
}

.popover-tags {
    max-height: calc(100vh - 250px);
    overflow: auto;
    padding: 6px 0px;

    .tag-item {
        width: 100%;

        .el-checkbox__label {
            width: 100%;
        }

        height: 34px;
        line-height: 34px;
        margin: 0px;
        padding: 0px 12px;

        &:hover {
            background-color: #0000000d;
        }
    }
}

.tag-popover-arrow {
    transition: transform .5s;

    &.opening {
        transform: rotate3d(1, 0, 0, 180deg);
    }
}

.tag-popover-close {
    opacity: 0.6;

    &:hover {
        opacity: 0.9;
    }
}

.el-button {

    &.dis-btn-hover:hover,
    &.dis-btn-hover:focus {
        background-color: rgba(255, 255, 255, 0.93);
        color: var(--color-font2);
        border-color: #DCDFE6;
    }
}

.transition-popover-tb-enter-active,
.transition-popover-tb-leave-active {
    transition: all .2s;
}

.transition-popover-tb-enter,
.transition-popover-tb-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
</style>