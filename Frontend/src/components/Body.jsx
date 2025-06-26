import React, { useState } from 'react'
import css from './Body.module.css'
import MessageBox from './MessageBox';
import { useEffect } from 'react';

export default function Body(props) {
  const[messages, setMessage]= useState([]);
  const fetchdata=async()=>{
    try{
      const data = await fetch('http://localhost:3000/api');
      let res = await data.json();
      setMessage(res);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchdata();
  },[])
  return (
    
    <div className={css.main}>
        <div  className={css.chatBox}>
          {
            messages.map((m, index)=>{
              return <div key={index} className={css.chatWrapper} style={(m.owner==props.user)?{alignItems: "flex-end"}:{}}>
                <div style={(m.owner==props.user)?{backgroundColor: "#0F493F",borderRadius: "20px 0px 20px 20px"}:{}} className={css.chats}>
                  <p className={css.chatOwner}>{m.owner}</p>
                  <p className={css.chatText}>{m.text}</p>
                </div>
              </div>
            })
          } 
        </div>
        <MessageBox messages={messages} setMessage={setMessage} user={props.user} setUser={props.setUser}/>
    </div>
  )
}
