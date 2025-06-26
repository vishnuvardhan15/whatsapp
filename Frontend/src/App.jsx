import React, { useState } from 'react'
import Nav from './components/Nav'
import Body from './components/Body'
import "./App.css"

function App() {
    const[user, setUser] = useState("bot");
  return (
    <div className='app'>
      <div className='mainCtn'>
        <Nav user={user} setUser={setUser}/>
        <Body user={user} setUser={setUser}/>
      </div>
    </div>
  )
}

export default App