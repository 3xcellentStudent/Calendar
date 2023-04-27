const UserModel = require('../models/user-model')
const uuid = require('uuid')
const HashingService = require('./hashing-service')
const mailService = require('./mail-service')
const UserDto = require('../dtos/user-dto')
const tokenService = require('./token-service')

class UserService{

   async generateAndSaveToken(userDto){
      const tokens = tokenService.generateTokens({...userDto})
      await tokenService.saveToken(userDto.id, tokens.refreshToken)

      return {...tokens, user: userDto}
   }

   async registration(email, password){
      const candidate = await UserModel.findOne({email})

      if(candidate) return `Пользователь с почтовым адресом ${email} уже существует`

      let hashedPassword = null
      await HashingService.scryptHash(password)
      .then(hashed => hashedPassword = hashed)
      const activationLink = uuid.v4()
      const user = await UserModel.create({email, password: hashedPassword, activationLink})
      await mailService.activationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

      const userDto = new UserDto(user)
      return this.generateAndSaveToken(userDto)
   }

   async activate(activationLink){
      const user = await UserModel.findOne({activationLink})

      if(!user) return 'Неккоректная ссылка активации'

      user.isActivated = true
      await user.save()
   }

   async login(email, password){
      const user = await UserModel.findOne({email})
      if(!user) return 'Invalid email'

      if(!user.isActivated) return `Подтвердите свою почту ${email} !`

      const isPassEquals = await HashingService.scryptVerify(password, user.password)
      if(!isPassEquals) return 'Invalid password'

      const userDto = new UserDto(user)
      return this.generateAndSaveToken(userDto)
   }

   async logout(refreshToken){
      const token = await tokenService.removeToken(refreshToken)
      return token
   }

   async reset(email){
      try {
         const user = await UserModel.findOne({email})
         if(!user) return 'Email not found !'

         const random = () => {
            const result = (Math.random() * 10000).toFixed(0)
            if(`${result}`.length !== 4) return random()
            else return result
         }

         const code = random()

         await mailService.sendLetterResetPass(email, code)

         return {code: code}
      } catch (err){console.log(err)}
   }

   async recovery(email, password){
      try {
         let hashedPassword = null
         await HashingService.scryptHash(password)
         .then(hashed => hashedPassword = hashed)
         
         const user = await UserModel.findOneAndUpdate(email, {password: hashedPassword})
         return user
      } catch (err){console.log(err)}
   }

}

module.exports = new UserService()