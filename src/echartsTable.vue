<template>
    <div>
        <div ref="chartContainer" style="width: 600px; height: 400px;"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
const myChart = ref(null)
const chartContainer = ref()
function initMap() {
    myChart.value = echarts.init(chartContainer.value)
    // 设置图表配置项
    const options = {
        // ECharts 配置项
        xAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [10, 20, 30, 40, 50],
                type: 'bar',
            },
        ],
    };

    // 渲染图表
    myChart.value.setOption(options);
}
function handleContextMenu(params) {
    // 阻止默认的右键菜单
    params.event.preventDefault();

    // 获取鼠标位置
    const x = params.event.offsetX;
    const y = params.event.offsetY;

    // 创建自定义的右键菜单 DOM 元素
    const menu = document.createElement('div');
    menu.innerHTML = `<div id=cd>菜单内容</div><ul>
          <li>加入购物车</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          </ul>`;;
    menu.style.position = 'absolute';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    menu.style.background = '#fff';
    menu.style.border = '1px solid #000';
    menu.style.padding = '5px';

    // 将菜单添加到图表容器中
    chartContainer.value.appendChild(menu);

    // 监听鼠标移动事件，用于关闭右键菜单
    myChart.value.getZr().on('mousemove', () => {
        // 移除自定义的右键菜单
        if (menu.parentNode) {
            menu.parentNode.removeChild(menu);
        }
        // 解绑鼠标移动事件监听
        myChart.value.getZr().off('mousemove');
    });
}
onMounted(() => {
    initMap()
    myChart.value.getZr().on('contextmenu', handleContextMenu);
})
</script>

<style lang="scss" scoped></style>