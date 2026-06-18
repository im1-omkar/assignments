import {atom, RecoilState} from 'recoil'

interface item {
    id : number,
    name : string,
    price : number,
    image : string
}

export const wishList: RecoilState<item[]> = atom<item[]>({
    key : 'wishList',
    default : [
        {
            id: 1,
            name: "Wireless Mouse",
            price: 799,
            image: "https://picsum.photos/200?random=1",
        },
        {
            id: 2,
            name: "Mechanical Keyboard",
            price: 2499,
            image: "https://picsum.photos/200?random=2",
        },
        {
            id: 3,
            name: "Gaming Headset",
            price: 1999,
            image: "https://picsum.photos/200?random=3",
        },
        {
            id: 4,
            name: "USB-C Hub",
            price: 1299,
            image: "https://picsum.photos/200?random=4",
        },
        {
            id: 5,
            name: "Laptop Stand",
            price: 999,
            image: "https://picsum.photos/200?random=5",
        },
        {
            id: 6,
            name: "Webcam",
            price: 1599,
            image: "https://picsum.photos/200?random=6",
        },
    ]
})