import {atom, RecoilState} from 'recoil'

interface item {
    id : number,
    name : string,
    price : number,
    image : string
}

export const wishList: RecoilState<item[]> = atom<item[]>({
    key : 'wishList',
    default: [
        {
            id: 1,
            name: "Logitech MX Master 3S Wireless Mouse",
            price: 799,
            image:
                "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 2,
            name: "Mechanical RGB Keyboard",
            price: 2499,
            image:
                "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 3,
            name: "Gaming Headset",
            price: 1999,
            image:
                "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 4,
            name: "USB-C Multiport Hub",
            price: 1299,
            image:
                "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 5,
            name: "Aluminium Laptop Stand",
            price: 999,
            image:
                "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
        },
        {
            id: 6,
            name: "HD Webcam",
            price: 1599,
            image:
                "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=600&q=80",
        },
    ]
})