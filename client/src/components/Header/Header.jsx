import './Header.scss'
import React from 'react'
import AuthWrapper from '../../Wrapper/AuthWrapper'
import {useDispatch, useSelector} from 'react-redux'
import {setAuth} from '../../slices/isAuth-slice'
import {setDate} from '../../slices/dateSlice'
import NavigateMonths from '../MainParts/CalendarPart/components/NavigateDate/NavigateDate'


export default function Header(props){

   const dispatch = useDispatch()
   const isAuth = useSelector(state => state.isAuthS.isAuth)

   const authWrapper = new AuthWrapper()

   async function callLogout(e){
      e.preventDefault()
      await authWrapper.logoutW()
      workWithRedux()
   }

   function workWithRedux(){
      // dispatch(setAuth({isAuth: false, userId: null}))
      dispatch(setAuth(false))
      dispatch(setDate(new Date().getDate()))
   }

   function Btn(){
      if(isAuth === true) return <button className='auth-buttons' onClick={e => callLogout(e)} >{props.title}</button>
   }


   return(
      <header>
         <div className="wrapper">
            {isAuth === true ? <NavigateMonths/> : <h1>Calendar</h1>}
            <Btn/>
         </div>
      </header>
   )
      
}