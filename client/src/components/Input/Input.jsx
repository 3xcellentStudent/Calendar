import React, {useRef} from 'react'
import {useDispatch} from 'react-redux'
import {rememberEmail, rememberPassword} from '../../slices/remember-slice'
import './Input.scss'

export default function Input(props){
   const emailRef = useRef()
   const passwordRef = useRef()

   const dispatch = useDispatch()

   const remember = (func, value) => dispatch(func(value))

   if(props.type === 'email'){
      return <input ref={emailRef}
      onChange={() => {remember(rememberEmail, emailRef.current.value)}}
      autoComplete="username"
      className={`input input-${props.type}`} 
      type={props.type} 
      name={props.type} 
      placeholder={props.descr} />
   } 
   else {
      return <input ref={passwordRef}
      onChange={() => {remember(rememberPassword, passwordRef.current.value)}}
      autoComplete="current-password"
      className={`input input-${props.type}`} 
      type={props.type} 
      name={props.type} 
      placeholder={props.descr} />
   }
}