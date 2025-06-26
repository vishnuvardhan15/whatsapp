import React, { useEffect, useState, useRef } from 'react'
import css from './MessageBox.module.css';
import {Send} from '@mui/icons-material';

export default function MessageBox(props) {
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
    props.setUser(prompt("Enter your name"));
    inputRef.current.focus();
  },[])
  
  const sendData = async ()=>{
    try {
        const data = await fetch('http://localhost:3000/api',{
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
    props.setMessage([...props.messages,{owner: props.user, text: value}]);
    setValue('');
    sendData()
    setI((i+1)%arr.length)
    setPlaceHolder(arr[i]);
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
