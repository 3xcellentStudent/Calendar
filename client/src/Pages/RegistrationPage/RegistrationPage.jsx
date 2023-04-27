import './RegistrationPage.scss'
import Header from "../../components/Header/Header";
import Input from '../../components/Input/Input'
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn'
import {useDispatch} from 'react-redux'
import {setRedirectS} from '../../slices/redirect-slice'
import AuthWrapper from '../../Wrapper/AuthWrapper'


export default function RegistrationPage(){

   const dispatch = useDispatch()
   const authWrapper = new AuthWrapper()

   const data = [
      {type: 'email', descr: 'E-mail',},
      {type: 'password', descr: 'Password',},
   ]


   function redirectLoginPage(e){
      e.preventDefault()
      dispatch(setRedirectS('lgPage'))
   }
   

   return(
      <>
         <Header/>
         <div className="wrapper-form">
            <form className='auth-form'>
               <h2>Registration</h2>
               {data.map((item, index) => {
                  return <Input key={`input-${index}`} type={item.type} name={item.type} descr={item.descr} />
               })}
               <div className="buttons">
                  <SubmitBtn nameFunc={authWrapper.registrationW} text="Registration" />
                  <button onClick={e => redirectLoginPage(e)} className='button-redirect'>Do you have account ?</button>
               </div>
            </form>
         </div>
      </>
   )
}