/* pinia的组合式 */
import { defineStore } from "pinia"
import { reactive, computed } from "vue"
export const useCartStore = defineStore("carts", () => {
    // ref 变量  --->  state
    // computed() 计算属性  --->  getters 
    // functions 函数  --->  actions
    let cartList = reactive([])
    const addCartNum = (goods) => {
        let _index = -1;
        cartList.forEach((i, j) => {
            if (i.id == goods.id) {
                _index = j
            }
        })
        if (_index != -1) {
            cartList[_index].num++
        } else {
            goods.num = 1;
            cartList.push(goods)
        }
    }
    const minusCartNum = (id) => {
        cartList.forEach((i, j) => {
            if (i.id == id) {
                i.num--
            } else {
                cartList.splice(j, 1)
                return
            }
        })
    }
    let allNum = computed(() => {
        let _allNum = 0;
        cartList.forEach((i, j) => {
            _allNum += i.num
        })
        return _allNum
    })
    return {
        cartList,
        addCartNum,
        minusCartNum,
        allNum
    }
})