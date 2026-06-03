import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Signup from './components/Signup'
import Home from './components/Home'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
