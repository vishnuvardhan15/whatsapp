import React from 'react'
import css from './Nav.module.css'
import {Person,DeleteOutline} from '@mui/icons-material';
export default function Nav(props) {
  const clearChat = async()=>{
    try {
        const data = await fetch('http://localhost:3000/api',{
        method:'DELETE',
      });
    } catch (error) {
      console.log(error);
    }
    
    
  }
  return (
    <div className={css.main}>
        <div className={css.profile}><Person className={css.personIcon} /></div>
        <div className={css.name}><h2>{props.user}</h2></div>
        <div className={css.more} onClick={clearChat}><DeleteOutline className={css.deleteOutlineIcon}/></div>
    </div>
  )
}