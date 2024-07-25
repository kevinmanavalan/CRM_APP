import { useState } from 'react'
import Home from './Home/Home'
import NavBar from './NavBar/NavBar'
import CustomerListing from './Customer/CustomerListing'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/customerslisting' element={<CustomerListing/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App
