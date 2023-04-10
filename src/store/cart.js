import { defineStore } from "pinia";
/* pinia ->>选项 */
export const useCartStore = defineStore("cart", {
    state: () => {
        return {
            cartList: [],
        }
    },
    getters: {
        allNum() {
            let _allNum = 0;
            this.cartList.forEach((i, j) => {
                _allNum += i.num
            })
            return _allNum
        }
    },
    actions: {
        addCartNum(goods) {
            let _index = -1;
            this.cartList.forEach((i, j) => {
                if (i.id == goods.id) {
                    _index = j
                }
            })
            if (_index != -1) {
                this.cartList[_index].num++
            } else {
                goods.num = 1;
                this.cartList.push(goods)
            }
        },
        minusCartNum(id) {
            this.cartList.forEach((i, j) => {
                if (i.id == id) {
                    i.num--
                } else {
                    this.cartList.splice(j, 1)
                    return
                }
            })
        }
    }
})
