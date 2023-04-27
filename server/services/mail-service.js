const nodemailer = require('nodemailer')

class MailService{
   constructor(){
      this.transporter = nodemailer.createTransport({
         host: process.env.MAIL_HOST,
         port: 465,
         secure: true,
         auth: {
            user: process.env.USER_MAIL,
            pass: process.env.MAIL_PASS,
         }
      })
   }

   async activationMail(email, link){
      this.transporter.sendMail({
         from: `Calendar <${process.env.USER_MAIL}>`,
         to: email,
         subject: `Активация аккаунта на ${process.env.API_URL}`,
         text: '',
         html: `
         <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
         </div>`
      })
   }

   async sendLetterResetPass(email, code){
      this.transporter.sendMail({
         from: `Calendar <${process.env.USER_MAIL}>`,
         to: email,
         subject: `Password Recovery`,
         text: '',
         html: `
         <div>
            <h1>Code for recovery your password: </h1>
            <span style="font-size: calc(1vw + 1vh);font-weight: 700;">${code}</span>
         </div>`
      })
   }

   async sendLetterRecPass(password){
      this.transporter.sendMail({
         from: `Calendar <${process.env.USER_MAIL}>`,
         to: email,
         subject: `Password Recovery`,
         text: '',
         html: `
         <div>
            <h1>Code for recovery your password: </h1>
            <span style="font-size: calc(1vw + 1vh);font-weight: 700;">${code}</span>
         </div>`
      })
   }
}

module.exports = new MailService()