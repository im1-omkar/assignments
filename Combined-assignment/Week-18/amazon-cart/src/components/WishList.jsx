
const WishList = () => {
  return (
    <div>
      <div className="flex w-screen h-screen">
        <div className="flex-5">
          <div>Shopping Cart</div>
          <div>
            <div className="p-4 border-2">
              <div>Title</div>
              <div>Status</div>
            </div>
            <div className="p-4 border-2">
              <div>Title</div>
              <div>Status</div>
            </div>
            <div className="p-4 border-2">
              <div>Title</div>
              <div>Status</div>
            </div>

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

export default WishList;
