<template>
    <div>
        <vueIndex :tableData="tableData" :total="total" :pageSizesTotal='pageSizesTotal'  :tableHeader="tableHeader" :currentPage="currentPage"
            :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" />
    </div>
</template>

<script setup>
import axios from 'axios';
import vueIndex from '../table/index.vue';
const tableData = ref([]);
const total = ref(0)
const currentPage = ref(1);
const pageSize = ref(4)
const pageSizesTotal=ref([4,8,12,16,20])
const tableHeader = ref([{ prop: 'name', label: '名字' }, { prop: 'small_image', label: '图片' }, { prop: 'price', label: '价格' }, { prop: 'act', label: '操作' }])
const getNewList = () => axios.get('/public/db.json').then((res) => {
    tableData.value = res.data.imgs;
    total.value = res.data.imgs.length;
})
//改变条数
const handleSizeChange = (val) => {
    console.log(val,'23****')
    currentPage.value = 1
    pageSize.value=val;
    getNewList();
}
//改变页数
const handleCurrentChange = (val) => {
    console.log(val,'27***')
    currentPage.value = val
    getNewList()
}
onMounted(() => {
    getNewList()
})
</script>

<style lang="scss" scoped></style>