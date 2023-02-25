<!-- 项目的子组件 封装后的表格、分页 -->
<!-- 表格数据 Start-->
<template>
    <el-table :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
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
                <template #default="scope" v-if="item.prop === 'nowtime'">{{
                    encryptionTime(scope.row)
                }}</template>
                <template #default="scope" v-if="item.prop === 'phone'">{{
                    encryptionPhone(scope.row)
                }}</template>
                <template #default="scope" v-if="item.prop === 'price'"><span style="color:red;">￥</span>{{
                    encryptionPrice(scope.row)
                }}</template>
                <template #default="scope" v-if="item.prop === 'act'">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
            <el-table-column v-if="false" :prop="item.prop" :label="item.label" :align="item.align || 'center'"
                :show-overflow-tooltip="item.overHidden || false" :min-width="item.minWidth || '100px'"
                :sortable="item.sortable || false" :type="item.type || 'normal'" :fixed="item.fixed"
                :width="item.width || ''">
                <!-- 自定义列 开关-->
                <template #default="scope" v-if="item.dataType === 'switch'">
                    <el-switch v-model="scope.row.status" active-text="开" inactive-text="关" active-color="#13ce66"
                        inactive-color="#ff4949" @change="changeSwitchStatus(scope.row.id, scope.row.status)" />
                </template>
                <!-- 加密手机号 -->
                <template #default="scope" v-if="item.phone === 'phone'">{{
                    encryptionPhone(scope.row)
                }}</template>
                <!-- 自定义列 按钮 -->
                <template #default="scope" v-if="item.dataType === 'operate'">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </template>

        <!-- 自定义列 按钮 -->
        <el-table-column fixed="right" label="操作列" :width="operateWidth" v-if="isOperate">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 表格数据 End-->

    <!-- 分页 Start-->
    <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="pageSizesTotal" :small="small"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    <transition name="el-zoom-in-bottom">
        <div v-show="isTrans" class="transition-box">
            <transitionVue v-bind="newObj"  @handleDom="handleDom"  @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"/>
        </div>
    </transition>
</template>
<!-- 分页 End-->

<script setup>
import { nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useCounterStore } from '../store';
import { defineProps, defineEmits, onMounted, reactive } from "vue";
import dayjs from 'dayjs'
import transitionVue from './transition.vue'
const user = useCounterStore()
const { isDialog, isTrans } = storeToRefs(user)
console.log(isDialog, isTrans, user, '87**')
const props = defineProps({
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
});
const newObj =props
console.log(newObj,'145***')
const emits = defineEmits([
    "handleSizeChange",
    "handleCurrentChange",
    "handleChangeSwitchStatus",
    "handleDom"
]);
//开关改变事件
const changeSwitchStatus = (rowId, _boolean) => {
    emits("handleChangeSwitchStatus", rowId, _boolean);
};
// 操作列 编辑
const handleEdit = (index, row) => {
    console.log("92*****")
    //调用pinia的action的方法
    user.changeDialog()
    nextTick(() => {
        emits('handleDom')
    })
    /*       
    store.$patch((state) => {
        state.baseUrl = 'https://www.jd.com/'
        state.ipList[0] = '192.168.10.222'
      })

    */
};
// 操作列 删除
const handleDelete = (index, row) => {
    user.changeTrans()
    // console.log(" index🚀", index);
    // console.log(" row🚀", row);
};

// 页数改变的时候触发的事件
const handleSizeChange = (val) => {
    emits("handleSizeChange", val);
};
// 当前页改变的时候触发的事件
const handleCurrentChange = (val) => {
    emits("handleCurrentChange", val);
};

// 手机号格式化
const encryptionPhone = (row) => {
    // console.log(row.phone, "110***");
    let phone = String(row.phone);
    //这里的用到数组的slice的截取方法,一定要注意数据的类型是字符串或者是数组的类型
    if (phone != null) {
        const rol = phone.slice(0, 3); //用于截取数组，并返回截取到的新的数组，数组与字符串对象都使用(⚠️：对原数组不会改变)
        const ral = phone.slice(7, 12);
        const pho = rol + "****" + ral;
        // console.log(pho, "116***");
        return pho;
    }
};
//价格格式化
const encryptionPrice = (row) => {
    //格式化价格的时候必须是数字类型
    let price = row.price;
    if ((price ?? '') !== '') {
        // console.log(price, '127***');
        let prices = `${Number(price).toLocaleString()}`;
        return prices
    }

}
//时间格式化
const encryptionTime = (row) => {
    //格式化时间戳必须是数字类型,不能是字符串类型
    let time = (row.nowtime);
    if ((time ?? '') !== '') {
        let times = dayjs(time).format('YYYY-MM-DD HH:mm:ss');
        return times
    }

}


onMounted(() => {
    // console.log("！这里输出😂👨🏾‍❤️‍👨🏼==>： ", props.tableData);
    // console.log("表格🚀", props.tableData, props.tableHeader, props.isOperate);
    // console.log("页容量🚀", props.total);
});
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

.el-switch__label--left {
    position: relative;
    left: 45px;
    color: #fff;
    z-index: -1111;
}

.el-switch__core {
    width: 50px !important;
}

.el-switch__label--right {
    position: relative;
    right: 46px;
    color: #fff;
    z-index: -1111;
}

.el-switch__label--right.is-active {
    z-index: 1111;
    color: #fff !important;
}

.el-switch__label--left.is-active {
    z-index: 1111;
    color: #fff !important;
}

.transition-box {
    position: absolute;
    top: 0;
    z-index: 5;
    margin-bottom: 10px;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
}
</style>
