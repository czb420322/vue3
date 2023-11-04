import { defineStore } from "pinia";
export const useSum = defineStore('sum', {
    state: () => {
        return {
            price: 0,
            name: '小明',
            age: 15,
            sex: '男'
        }
    },
    getters: {
        isAdult:(state) => {
            console.log(state,'13***')
            return state.age >= 18 ? '成年人' : '未成年'
        },
        setAge:(state)=>{
            return state.age >= 18 ? '成年人可以喝酒' : '未成年不可以喝酒'
        },
        getSex(state){
            return state.sex="未知"
        }
    },
    actions: {
        calcPrice() {
            return this.price += 5
        }
    }
})