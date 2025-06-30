import React, { useEffect, useState, useRef } from 'react'
import css from './MessageBox.module.css';
import {Send} from '@mui/icons-material';
import {connect, io} from 'socket.io-client';

export default function MessageBox(props) {
  const socket = useRef(null);
  const[value, setValue] = useState('');
  const[i, setI] = useState(0);
  const arr =[
    "Hey! Just checking in 👋",

    "Typing… (but not sure what to say yet)",

    "Can we talk later? Busy now 🙇‍♂️",

    "Got something to share, one sec…",

    "Just wanted to say hi 😊",

    "Oops, accidental text 😅 or was it?"
  ]
  const[placeHolder, setPlaceHolder] = useState(arr[0]);
  const inputRef = useRef(null);
  useEffect(()=>{
    inputRef.current.focus();
    socket.current = io('https://whatsapp-vishnu-api.vercel.app')
    socket.current.on("connect",()=>{
      console.log('connected web socket')
    })
  },[])
  
  const sendData = async ()=>{
    console.log("inside sendData func");
    
    try {
        const data = await fetch('https://whatsapp-vishnu-api.vercel.app/api',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({owner: props.user, text: value})
      });
    } catch (error) {
      console.log(error);
    }
  }
  const handleInputChange = (e)=>{
    setValue(e.target.value);
  }
  const handleBtnClick = (e)=>{
    e.preventDefault();
    // props.setMessage([...props.messages,{owner: props.user, text: value}]);
    setValue('');
    sendData()
    setI((i+1)%arr.length)
    setPlaceHolder(arr[i]);
    socket.current.emit('clientMessage',{owner: props.user, text: value});
  }
  return (
    <form className={css.mainCtn}>
        <div className={css.inputWrapper}>
          <input type="text" ref={inputRef} value={value} placeholder={placeHolder} className={css.input} onChange={handleInputChange}/>
        </div>
        <button type='submit' className={css.button} onClick={handleBtnClick}><Send className={css.sendIcon}/></button>
    </form>
  )
}
