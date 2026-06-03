import { Link } from "react-router"

const Home = () => {
  return (
    <div>
        <h1>The Great Money Transfering Application</h1>
        <Link to='/signup'>
            <button>SignUp</button>
        </Link>
        <Link to='/signin'>
            <button>SignIn</button>
        </Link>
        
       
    </div>
  )
}

export default Home