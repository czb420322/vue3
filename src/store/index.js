import { defineStore } from "pinia";
export const  useCounterStore  = defineStore('counter',{
    state:()=>{
        return { 
            count:0,
            storeObj:{
                name:'大菠萝',
                age:3
            },
            storeArray:[]
        }
    },
    actions:{
        add(){
            this.count++
        }
    }
})