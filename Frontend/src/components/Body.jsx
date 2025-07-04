import React, { useRef, useState } from 'react'
import css from './Body.module.css'
import MessageBox from './MessageBox';
import { useEffect } from 'react';
import {io} from 'socket.io-client'

export default function Body(props) {
  const socket  = useRef(null);
  const[messages, setMessage]= useState([]);
  const focusRef = useRef(null);
  const fetchdata=async()=>{
    try{
      const data = await fetch('https://whatsapp-et8q.onrender.com/api');
      let res = await data.json();
      setMessage(res);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    socket.current = io('https://whatsapp-et8q.onrender.com')
    socket.current.on("connect",()=>{
      console.log('connected web socket')
    })
    fetchdata();
    socket.current.on('serverMessage',(data)=>{
      setMessage((prev)=>[...prev, data]);
    })
  },[])
  useEffect(()=>{
      if (focusRef.current) {
        focusRef.current.scrollIntoView({ behavior: "smooth" });
      }
  },[messages])
  return (
    
    <div className={css.main}>
        <div  className={css.chatBox}>
          {
            messages.map((m, index)=>{
              return <div key={index} className={css.chatWrapper} style={(m.owner==props.user)?{alignItems: "flex-end"}:{}}>
                <div style={(m.owner==props.user)?{backgroundColor: "#0F493F",borderRadius: "15px 0px 15px 15px"}:{}} className={css.chats}>
                  <p className={css.chatOwner}>{m.owner}</p>
                  <p className={css.chatText}>{m.text}</p>
                </div>
              </div>
            })
          } 
          <div ref={focusRef}></div>
        </div>
        <MessageBox messages={messages} setMessage={setMessage} user={props.user} setUser={props.setUser}/>
    </div>
  )
}
