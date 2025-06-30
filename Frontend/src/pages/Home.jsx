import React from 'react'
import css from './Home.module.css'
import Nav from '../components/Nav'
import Body from '../components/Body'
export default function home(props) {
  return (
    <div className={css.app}>
      <div className={css.mainCtn}>
        <Nav user={props.user} />
        <Body user={props.user} />
      </div>
    </div>
    
  )
}
