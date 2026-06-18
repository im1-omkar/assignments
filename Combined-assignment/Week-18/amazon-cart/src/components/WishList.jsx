import { useRecoilState, useRecoilValue } from "recoil";
import { wishList } from "../store/wishItemsState";
import { cartItemsState } from "../store/cartItemsState";
import toast from "react-hot-toast"

const WishList = () => {
  const wishListItems = useRecoilValue(wishList);
  const [cartList, setCartList] = useRecoilState(cartItemsState);

  const handleAddToCart = (id)=>{
    const toAdd = wishListItems.find((item)=> item.id == id)

    setCartList([...cartList,{...toAdd,quantity:1}])

    toast.success("Added to cart successfully")
  }

  return (
    <div className="h-screen w-screen flex">
      <div className="flex-1">
        <div>Your Wish List</div>
      </div>
      <div className="flex-4 h-full w-full">
        <div>Your Wish List</div>
        <div className='grid grid-cols-3 gap-5'>
          
          {
            wishListItems.map((item) => <div key={item.id} className="border flex flex-col justify-center items-center p-0" >
              <img src={item.image} className="p-8"/>
              <div>{item.name}</div>
              <div>{item.price}</div>
              <button onClick={() => { handleAddToCart(item.id) }} className="bg-yellow-300 border-2">Add to Cart</button>
            </div>)
          }
        </div>
        </div>

    </div>
  )
  
}

export default WishList;
