import { selector } from "recoil";
import { cartItemsState } from "./cartItemsState";

interface Item {
    id:number,
    name : string,
    price : number,
    image : string,
    quantity: number
}

export const cartTotalSelector = selector({
    key : 'cartTotalSelector',
    get : ({get}) => {
        const items = get(cartItemsState)

        let total = 0;

        items.forEach((item : Item )=>{
            total += item.price*item.quantity;
        })

        return total;
    }
})