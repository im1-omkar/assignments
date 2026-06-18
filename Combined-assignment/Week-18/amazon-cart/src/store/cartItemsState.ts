import { atom } from "recoil";


export const cartItemsState = atom({
    key : 'cartItems',
    default : [
        {
            id: 1,
            name: "Logitech MX Master 3S Wireless Mouse",
            price: 799,
            image:
                "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80",
            quantity : 1
        },
        {
            id: 2,
            name: "Mechanical RGB Keyboard",
            price: 2499,
            image:
                "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600&q=80",
            quantity: 1
        }
    ]
})