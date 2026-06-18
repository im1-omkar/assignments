import { atom } from "recoil";


export const cartItemsState = atom({
    key : 'cartItems',
    default : [
        {
            id: 1,
            name: "Wireless Mouse",
            price: 799,
            image: "https://picsum.photos/200?random=1",
            quantity : 1
        },
        {
            id: 2,
            name: "Mechanical Keyboard",
            price: 2499,
            image: "https://picsum.photos/200?random=2",
            quantity : 1
        }
    ]
})