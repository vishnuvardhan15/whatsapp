import React, { useEffect, useRef, useState } from 'react'
import css from './Login.module.css'
import {useNavigate} from 'react-router-dom'

export default function login(props) {
  const [value,setValue] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null)
  useEffect(()=>{
    inputRef.current.focus();
  },[]);

  const handleInputChange = (e)=>{
    setValue(e.target.value);
  }

  const handleBtnClick = (e)=>{
      e.preventDefault();
      props.setUser(value)
      console.log(value);
      navigate('/home')
  }

  return (
    <form className={css.mainCtn}>
            <div className={css.inputWrapper}>
              <h1 className={css.h1tag}>Login</h1>
              <input type="text" ref={inputRef} value={value} placeholder='Enter your username' className={css.input} onChange={handleInputChange}/>
              <button type='submit' className={css.button} onClick={handleBtnClick}>Enter Chat</button>
            </div>
    </form>
  )
}
