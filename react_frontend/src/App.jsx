import { useState } from 'react'
import Home from './Home/Home'
import NavBar from './NavBar/NavBar'
import CustomerListing from './Customer/CustomerListing'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/customerslisting' element={<CustomerListing/>}/>
      </Routes>
    </>
  )
}

export default App
