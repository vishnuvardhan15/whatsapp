import React, { useState } from 'react'
import Nav from './components/Nav'
import Body from './components/Body'
import "./App.css"
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
    const[user, setUser] = useState("bot");
  return (
    <div className='app'>
      <Routes>
        <Route path='/home' element={<Home user={user}/>}/>
        <Route path='/' element={<Login user={user} setUser={setUser}/>}/>
      </Routes>
    </div>
  )
}

export default App