import {Link} from 'react-router-dom'


const Header = () => {
  return (
    <div className="bg-amber-300 h-20 flex">
        <div className="flex-4">amazon.in</div>
        <div className="flex-1">
          <nav className='w-full grid grid-cols-2 '>
            <Link to="/">WishList</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </div>
    </div>
  )
}

export default Header