import {  useRecoilState } from "recoil";
import { cartItemsState } from "../store/cartItemsState";

const AmazonStyleCart = () => {

  const [cartList, setCartList] = useRecoilState(cartItemsState)

  const handleIncrease = (id)=>{
    const updatedList = []
    cartList.forEach((item)=>{
      if(item.id == id){
        updatedList.push(
          {
            id : item.id,
            name : item.name,
            price : item.price,
            image : item.image,
            quantity : item.quantity + 1
          }
        )
      }
      else{
        updatedList.push(item)
      }
    })

    setCartList(updatedList)
  }

  const handleDecrease = (id)=>{
    const updatedList = []
    cartList.forEach((item) => {
      if (item.id == id) {
        updatedList.push(
          {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity - 1
          }
        )
      }
      else {
        updatedList.push(item)
      }
    })

    setCartList(updatedList)
  }

  return (
    <div>
      <div className="flex w-screen h-screen">
        <div className="flex-5">
          <div>Shopping Cart</div>
          <div>
              {
                cartList.map((item)=>{
                  return <div key={item.id} className="flex flex-row w-full gap-3 p-3">
                    <img src={item.image}/>
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                    <div className="flex flex-row h-min gap-3 p-3">
                      <button onClick={()=>{handleDecrease(item.id)}} className="border bg-yellow-300">-</button>
                      <div>{item.quantity}</div>
                      <button onClick={() => { handleIncrease(item.id) }} className="border bg-yellow-300">+</button>
                    </div>
                  </div>
                })
              }
          </div>
        </div>
        <div className="flex-1">
          <div>Order Summary</div>
          <div>Total Order</div>
          <button className="bg-yellow-300">Proceed to buy</button>
        </div>
      </div>
    </div>
  )
}

export default AmazonStyleCart;