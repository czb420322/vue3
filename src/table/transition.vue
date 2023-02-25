<template>
    <div>
        <transition name="el-zoom-in-bottom">
            <div>
                <div @click="handleClose">
                    <CloseBold class="blod" />
                </div>
                <div>
                    <el-table :data="
                        tableDatas.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    " height="800" style="width: 100%" border>
                        <!-- 循环表头 template是不会渲染为dom 在小程序中是block  -->
                        <template v-for="(item, index) in tableHeader" :key="index">
                            <el-table-column :prop="item.prop" :label="item.label" :align="item.align || 'center'"
                                :show-overflow-tooltip="item.overHidden || false" :min-width="item.minWidth || '100px'"
                                :sortable="item.sortable || false" :type="item.type || 'normal'" :fixed="item.fixed"
                                :width="item.width || ''">
                                <template #default="scope" v-if="item.prop === 'small_image'">
                                    <img style="width: 100px; height: 100px" :src="scope.row.small_image" alt="" />
                                </template>
                                <!-- <template #default="scope" v-if="item.prop === 'nowtime'">{{
                                    encryptionTime(scope.row)
                                }}</template>
                                <template #default="scope" v-if="item.prop === 'phone'">{{
                                    encryptionPhone(scope.row)
                                }}</template>
                                <template #default="scope" v-if="item.prop === 'price'"><span style="color:red;">￥</span>{{
                                    encryptionPrice(scope.row)
                                }}</template> -->
                                <template #default="scope" v-if="item.prop === 'act'">
                                    <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                                    <el-button size="small" type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                                    <el-button size="small" type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { useCounterStore } from '../store'
const newProps = defineProps({
    // 表格显示的数据
    tableData: {
        type: Array,
        default: function () {
            return [];
        },
    },
    // 表头数据
    tableHeader: {
        type: Array,
        default: function () {
            return [];
        },
    },
    // 控制操作列是否显示
    isOperate: {
        type: Boolean,
        default: function () {
            return false;
        },
    },
    operateWidth: {
        type: Number,
        default: () => 200,
    },
    // 总页数
    total: {
        type: Number,
        // 必传类型
        required: true,
        default: 0,
    },

    // 分页的页容量数组
    pageSizesTotal: {
        type: Array,
        default() {
            return [4, 8, 12, 16, 20];
        },
    },
    // 分页的布局
    layout: {
        type: String,
        default: "total, sizes, prev, pager, next, jumper",
    },
    //分页的页数
    currentPage: {
        type: Number,
        default: 1,
    },
    //分页的条数
    pageSize: {
        type: Number,
        default: 10,
    },
})
const emits = defineEmits([
    "handleSizeChange",
    "handleCurrentChange",
    "handleChangeSwitchStatus",
    "handleDom"
]);
const user = useCounterStore();
const tableDatas = ref([]);
const handleClose = () => {
    user.recoverTrans()
}
onMounted(() => {
    setTimeout(() => {
        tableDatas.value = newProps.tableData
    }, 500)
})

</script>

<style lang="scss" scoped>
.blod {
    font-size: 34px;
    cursor: pointer;
}
</style>