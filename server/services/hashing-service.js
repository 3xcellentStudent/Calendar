const crypto = require('crypto')
const util = require('util')

class HashingService{

   async scryptHash(password, salt){
      const saltInUse = salt || crypto.randomBytes(16).toString('hex')

      const hashBuffer = await util.promisify(crypto.scrypt)(`${password}`, saltInUse, 32)

      return `${hashBuffer.toString('hex')}:${saltInUse}`
   }

   async scryptVerify(password, hashAndSalt){
      const [, salt] = hashAndSalt.split(':')

      return await this.scryptHash(password, salt) === hashAndSalt
   }

}

module.exports = new HashingService()