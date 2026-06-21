import React, { useEffect, useRef, useState } from 'react'
import css from './Auth.module.css'
import {useNavigate} from 'react-router-dom'
import {showAlert} from '../store/alertSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Signup() {
  const [user,setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e)=>{
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  const handleBtnClick = (e)=>{
      e.preventDefault();
      registerUser(user);
  }

  const registerUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message || 'Registration failed');
      }
      dispatch(showAlert({message: 'Registration successful', type: 'success'}))
      navigate('/login')
    } catch (error) {
      dispatch(showAlert({message: error.message, type: 'error'}))
    }
  };

  return (
    <div className={css.mainCtn}>
      <form className={css.container}>
        <div className={css.inputWrapper}>
          <h1 className={css.h1tag}>Signup</h1>
          <input type="name" name='name' value={user.name} placeholder='Enter your name' className={css.input} onChange={handleInputChange}/>
          <input type="email" name='email' value={user.email} placeholder='Enter your email' className={css.input} onChange={handleInputChange}/>
          <input type="password" name='password' value={user.password} placeholder='Enter your password' className={css.input} onChange={handleInputChange}/>
          <button type='submit' className={css.button} onClick={handleBtnClick}>Signup</button>
          <p style={{color: "gray"}}>Already have an account? </p>
          <button type='submit' className={css.button} onClick={() => navigate('/login')}>Login</button>
        </div>
      </form>
    </div>
  )
}
