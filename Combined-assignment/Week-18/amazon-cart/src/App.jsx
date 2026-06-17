import { Routes, Route } from "react-router-dom"
import './App.css'
import WishList from "./components/WishList"
import AmazonStyleCart from "./components/AmazonStyleCart"
import Header from "./components/Header"


export const App = () => {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<WishList />} />
        <Route path="/cart" element={<AmazonStyleCart />} />
      </Routes>
    </>

  )
}

export default App
