import $api from "../http/index";

export default class AuthService{

   static async registration(email, password){
      return $api.post('/registration', {email, password})
   }

   static async login(email, password){
      return $api.post('/login', {email, password})
   }
   
   static async logout(){
      return $api.post('/logout')
   }

   static async resetPass(email){
      return $api.post('/reset-password', {email})
   }

   static async recoverPass(params){
      return $api.post('/recover-password', params)
   }

}