import { ref, reactive, onMounted } from "vue"
export const statu= ref(false);
export const changeFlag = () => {
    statu.value=!statu.value
}