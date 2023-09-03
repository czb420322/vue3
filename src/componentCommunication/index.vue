<template>
    <ul>
        <li v-for="item of  msgList" :key=item.id>
            <p>
                <span>{{ item.user ?? "" }}</span>
                <span>{{ item.dateTime }}</span>
            </p>
            <p>
                消息：{{ item.msg }}
            </p>
        </li>
    </ul>
    <input type="text" v-model="msg">
    <button @click="handleSendBtnClick">发送</button>
</template>

<script setup>
import dayjs from 'dayjs'
import { ref } from 'vue';
import {useWebSocket} from "./hooks/index.js"
const msg = ref('');
const msgList = ref([])
const ws = useWebSocket(handleMessage)
console.log(ws,'24***')
let userName = '';
onMounted(() => {
    userName = localStorage.getItem('userName');
    if (!userName) {
        // alert('跳转！')
    }
})
const handleSendBtnClick = () => {
    console.log("32***")
    const _msg = msg.value;
    if (!_msg.trim().length) {
        return
    }
    msgList.value.push({
        id: Date.now(),
        user: userName,
        dateTime: formatterTime(Date.now()),
        msg: msg.value
    })
    msg.value = ''
    console.log(msgList, '42***')
}
function handleMessage(e){

}
const formatterTime = (val) => {
    return dayjs(val).format('YYYY-MM-DD HH:mm:ss')

}
</script>

<style lang="scss" scoped></style>