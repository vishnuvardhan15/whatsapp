import React from 'react'
import css from './Nav.module.css'
import {Person,DeleteOutline} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import BASE_URL from '../../config';
export default function Nav(props) {
  const user = useSelector((state) => state.auth.user);
  const clearChat = async()=>{
    try {
        const data = await fetch(
            `${BASE_URL}/api/messages`,
            {
                method:'DELETE',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            }
        );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={css.main}>
        <div className={css.profile}><Person className={css.personIcon} /></div>
        <h1 style={{color: "#fff"}}>{user.name}</h1>
        <div className={css.more} onClick={clearChat}><DeleteOutline className={css.deleteOutlineIcon}/></div>
    </div>
  )
}