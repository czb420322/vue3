<template>
    <div>
        <!-- v-bind=obj设置一个对象,把单向传输的所有的数据一次性传递给子组件 -->
        <vueIndex @handleDom="handleDom" v-bind="obj" @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange" />
        <sliderDialog id="big" ref="bigDialog" v-if="isDialog" @hclose="hclose" />
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCounterStore } from '../store';
import { reactive } from 'vue';
import axios from 'axios';
import vueIndex from '../table/index.vue';
import sliderDialog from './sliderDialog.vue';
const store = useCounterStore()
const { isDialog } = storeToRefs(store)
const bigDialog = ref()
console.log(bigDialog, '19***')
const obj = reactive({
    operateWidth: 300,
    tableData: [],
    total: 0,
    currentPage: 1,
    pageSize: 4,
    pageSizesTotal: [4, 8, 12, 16, 20],
    tableHeader: [{ prop: 'name', label: '名字' }, { prop: 'small_image', label: '图片' }, { prop: "phone", label: '手机号码' }, { prop: "nowtime", label: '时间' }, { prop: 'price', label: '价格' }, { prop: 'act', label: '操作' }]
})
const getNewList = () => axios.get('/public/db.json').then((res) => {
    obj.tableData = res.data.imgs;
    obj.total = res.data.imgs.length;
    // tableData.value = res.data.imgs;
    // total.value = res.data.imgs.length;
})
//改变条数
const handleSizeChange = (val) => {
    console.log(val, '23****')
    obj.currentPage = 1
    obj.pageSize = val;
    getNewList();
}
//改变页数
const handleCurrentChange = (val) => {
    console.log(val, '27***')
    obj.currentPage = val
    getNewList()
}
const hclose = (val) => {
    console.log(val);
    store.$patch((state) => {
        state.isDialog = val
    })
}
const handleDom = () => {
    let dom = document.getElementById("big")
    // dom.style.display = 'block';
    dom.style.top = "25px"
    console.log(dom, '59**')
}
onMounted(() => {
    getNewList()
})
</script>

<style lang="scss" scoped></style>