
const AmazonStyleCart = () => {
  return (
    <div className="h-screen w-screen flex">
      <div className="flex-1">
        <div>Your Wish List</div>
      </div>
      <div className="flex-4 h-full w-full">
        <div>Your Wish List</div>
        <div className="h-screen w-full bg-amber-100 grid grid-cols-3 gap-10 p-8">
          <div className="bg-red-300"></div>
          <div className="bg-red-300"></div>
          <div className="bg-red-300"></div>
          <div className="bg-red-300"></div>

        </div>
      </div>
        
    </div>
  )
}

export default AmazonStyleCart