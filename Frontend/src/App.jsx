import React, { useState } from 'react'
import Nav from './components/Nav'
import Body from './components/Body'
import "./App.css"
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Navigate } from 'react-router-dom';
import Alert from './components/Alert';

function App() {
  return (
    <div className='app'>
      <Alert/>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path='/chat' element={<Home/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App