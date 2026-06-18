import { Routes, Route } from "react-router-dom"
import './App.css'
import WishList from "./components/WishList"
import AmazonStyleCart from "./components/AmazonStyleCart"
import Header from "./components/Header"
import { Toaster } from "react-hot-toast"


export const App = () => {

  return (
    <>
      <Toaster/>
      <Header/>
      <Routes>
        <Route path="/" element={<WishList />} />
        <Route path="/cart" element={<AmazonStyleCart />} />
      </Routes>
    </>

  )
}

export default App
