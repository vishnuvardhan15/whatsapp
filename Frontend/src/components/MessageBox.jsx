import React, { useEffect, useState, useRef } from 'react'
import css from './MessageBox.module.css';
import {Send} from '@mui/icons-material';
import {connect, io} from 'socket.io-client';
import { useSelector } from 'react-redux';

export default function MessageBox(props) {
  const socket = useRef(null);
  const[value, setValue] = useState('');
  const token = useSelector(state => state.auth.token);

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
    // socket.current = io('https://whatsapp-et8q.onrender.com')
    socket.current = io('http://localhost:3000')
    socket.current.on("connect",()=>{
      console.log('connected web socket')
    })
  },[])
  
  const sendData = async()=>{

      if(!props.selectedChat) return;

      const response = await fetch(
          'http://localhost:3000/api/message/send',
          {
              method:'POST',
              headers:{
                  'Content-Type':'application/json',
                  Authorization:`Bearer ${token}`
              },
              body:JSON.stringify({
                  chatId: props.selectedChat.chatId,
                  text:value
              })
          }
      );

      const message = await response.json();

      props.setMessages(prev=>[
          ...prev,
          message.message
      ]);

      setValue('');
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
      <div className={css.inputContainer}>
        <input type="text" className={css.input} ref={inputRef} value={value} placeholder={placeHolder} onChange={handleInputChange}/>
        <button type='submit' className={css.button} onClick={handleBtnClick}><Send className={css.sendIcon}/></button>
      </div>  
    </form>
  )
}
