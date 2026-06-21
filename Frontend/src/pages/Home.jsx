import React from 'react'
import css from './Home.module.css'
import Nav from '../components/Nav'
import Body from '../components/Body'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import socket  from '../utils/socket';

export default function home() {

  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
    }
    socket.connect();
  }, []);


  return (
    <div className={css.app}>
      <div className={css.mainCtn}>
        <Nav/>
        <Body/>
      </div>
    </div>
    
  )
}
