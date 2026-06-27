import React, { useEffect, useRef, useState } from 'react'
import css from './Auth.module.css'
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { showAlert } from '../store/alertSlice';
import {useNavigate} from 'react-router-dom'
import BASE_URL from '../../../config';

export default function login() {
  const [user,setUser] = useState({
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
        loginUser(user);
        console.log(user);
    }
    
    const loginUser = async (userData) => {
      try {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        const data = await response.json();
        if(!response.ok){
          throw new Error(data.message || 'Login failed');
        }
        dispatch(loginSuccess({
          token: data.token,
          user: {
            id: data.user_id,
            name: data.user_name
          },
        }));
        dispatch(showAlert({
          message: 'Login successful',
          type: 'success'
        }))
        navigate('/chat');
      } catch (error) {
        dispatch(showAlert({
          message: error.message,
          type: 'error'
        }));
      }
    };

  return (
    <div className={css.mainCtn}>
      <form className={css.container}>
        <div className={css.inputWrapper}>
          <h1 className={css.h1tag}>Login</h1>
          <input type="email" name='email' value={user.email} placeholder='Enter your email' className={css.input} onChange={handleInputChange}/>
          <input type="password" name='password' value={user.password} placeholder='Enter your password' className={css.input} onChange={handleInputChange}/>
          <button type='submit' className={css.button} onClick={handleBtnClick}>Login</button>
          <p style={{color: "gray"}}>Don't have an account? </p>
          <button type='submit' className={css.button} onClick={() => navigate('/signup')}>Signup</button>
        </div>
      </form>
    </div>
  )
}
