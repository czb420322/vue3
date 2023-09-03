<template>
    <div class="query-wrapper">
        <div id="main" style="width: 100%; height: 500px"></div>
    </div>
    <div class="query-wrapper">
        <div id="mains" style="width: 100%; height: 500px"></div>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue';
const { proxy } = getCurrentInstance()
let myEcharts = proxy.$echarts;
const txtSearch = ref('');
const addrSearch = ref('');
const tagsPopoverShowing = ref(true);
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
function getPie() {
    const data = [{
        'name': '涉疆',
        'value': 50
    }, {
        'name': '涉赌',
        'value': 150
    }, {
        'name': '涉娼',
        'value': 80
    }, {
        'name': '黑灰产',
        'value': 260
    }, {
        'name': '涉毒',
        'value': 150
    }, {
        'name': '涉稳',
        'value': 140
    }]
    let color = ['RGBA(255, 143, 100, 1)', 'RGBA(174, 212, 252, 1)', 'RGBA(255, 205, 98, 1)', 'RGBA(96, 122, 209, 1)', 'RGBA(80, 205, 124, 1)', 'RGBA(245, 212, 56, 1)']
    const option = {
        color: color,
        tooltip: {
            trigger: 'item'
        },
        // legend: {
        //   bottom: '20%', 
        //   itemWidth: 10, 
        //   itemHeight: 10, 
        // //   icon: 'square',
        //   itemGap: 40,
        //   textStyle: {
        //     color: 'rgba(68, 68, 69, 1)',
        //     fontSize: '14',
        //   },
        // },
        legend: { // 图例配置
            orient: 'vertical', // 图例布局，可以设置为 'horizontal' 或 'vertical'
            left: 'left', // 图例距离容器左侧的距离
            /* 这个只有文字加数据 */
            // formatter: function (name) {
            //     // 在图例后面添加名称和对应数据展示
            //     var dataValue = option.series[0].data.find(function (item) {
            //         return item.name === name;
            //     }).value;
            //     return name + '：' + dataValue;
            // }

            /* 这个只有文字加数据 以及百分比的*/
            formatter: function (name) {
          // 在图例后面添加名称、对应数据展示和百分比
          var seriesData = option.series[0].data;
          var total = seriesData.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.value;
          }, 0);
          var dataItem = seriesData.find(function (item) {
            return item.name === name;
          });
          var dataValue = dataItem.value;
          var percentage = ((dataValue / total) * 100).toFixed(2); // 计算百分比，保留两位小数
          return name + '：' +  '（占比：' + percentage + '%）'+dataValue ;
        }
            // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
            {
                type: 'pie',
                data: data,
                center: ['50%', '50%'],
                radius: ['30%', '45%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'outside',
                            color: color.map(item => {
                                return item
                            }),
                            // padding: [0, -100, 0, -100],
                            fontSize: 13,
                            formatter: function (params) {
                                if (params.name !== '') {
                                    return '{name|' + params.name + '}';
                                } else {
                                    return '';
                                }

                            },
                            rich: {
                                name: {
                                    color: "rgba(137, 150, 180, 1)",
                                    fontSize: 14,
                                    align: 'center',
                                    padding: [0, -100, 22, -100],
                                },
                            }
                        },
                        labelLine: {
                            length: 27,
                            length2: 70,
                            show: true,
                            color: '#00ffff'
                        }
                    }
                },
                name: '',
                hoverAnimation: false,
            }
        ]
    };
    var myChart = myEcharts.init(document.getElementById('mains'));
    myChart.setOption(option);
}
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
    getPie()
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