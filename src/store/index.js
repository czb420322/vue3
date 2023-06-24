import { defineStore } from "pinia";
export const useCounterStore = defineStore('counter', {
    state: () => {
        return {
            count: 0,
            storeObj: {
                name: '大菠萝',
                age: 3
            },
            storeArray: [],
            isDialog: false,
            isTrans:false
        }
    },
    getters:{

    },
    actions: {
        add() {
            this.count++
        },
        //修改dialog的状态
        changeDialog() {
            this.isDialog = true
        },
        //关闭dialog
        closeDialog(){
            this.isDialog=false
        },
        changeTrans(){
            this.isTrans = true
        },
        recoverTrans(){
            this.isTrans = false
        }
    }
})