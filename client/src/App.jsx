import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {setAuth} from './slices/isAuth-slice'
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import LoginPage from './Pages/LoginPage/LoginPage.jsx'
import ForgotPass from './Pages/ForgotPass/ForgotPass'
import MainPage from './Pages/MainPage/MainPage';
import {setDataArray} from './slices/dataArray-slice'
import takeRemindsFromDb from './components/MainParts/takeRemindsFromDb'


function App(){

   const dispatch = useDispatch()

   const redirectS = useSelector(state => state.redirectS.redirectS)
   const isAuth = useSelector(state => state.isAuthS.isAuth)

   let lock = true

   const [authState, setAuthState] = React.useState(isAuth)

   async function getRemindsFromDb(){
      const res = await takeRemindsFromDb()
      return dispatch(setDataArray(res))
   }


   React.useEffect(() => {
      if(lock){
         lock = false
         if(isAuth) setAuthState(isAuth)
         else defineAuthState()
      }
      if(isAuth) getRemindsFromDb()
   }, [isAuth])


   function defineAuthState(){
      const tokenFromStorage = localStorage.getItem('token')
      if(tokenFromStorage !== null){
         setAuthState(true)
         dispatch(setAuth(true))
      }
      else{
         setAuthState(false)
      }
   }

   if(authState === true){
      return(
         <main>
            <MainPage/>
         </main>
      )
   }

   else if(redirectS === 'lgPage' || redirectS === ''){
      return (
         <main>
            <LoginPage/>
         </main>
      )
   }

   else if(redirectS === 'resPage'){
      return (
         <main>
            <ForgotPass/>
         </main>
      )
   }

   else if(redirectS === 'regPage'){
      return (
         <main>
            <RegistrationPage/>
         </main>
      )
   }
}

export default App;