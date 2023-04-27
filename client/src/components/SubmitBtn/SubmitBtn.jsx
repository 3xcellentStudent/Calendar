import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setAuth} from '../../slices/isAuth-slice'
import './SubmitBtn.scss'

export default function SubmitBtn(props){

   const selector = useSelector(state => state.remember)
   const dispatch = useDispatch()

   class AuthAndStorageData{
      static haveToken(res){
         localStorage.setItem('token', res.data.accessToken)
         localStorage.setItem('userData', res.data.user.id)
         return dispatch(setAuth(true))
      }

      static haventToken(res){
         // localStorage.setItem('userData', res.data)
         return dispatch(setAuth(res.data))
      }
   }

   async function submiting(e){
      e.preventDefault()
      const res = await props.nameFunc(selector)
      res.data.accessToken ? AuthAndStorageData.haveToken(res)
      : AuthAndStorageData.haventToken(res)
   }

   return <button onClick={e => submiting(e)} className="auth-buttons">{props.text}</button>
}