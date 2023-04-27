const remindModel = require('../models/remind-model')


class RemindService{
   
   async createRemind(userId, title, text, time, cyclicity){
      return await remindModel.create({userId, title, text, time, cyclicity})
   }

   async updateRemind(userId, title, text, time, cyclicity){
      return await remindModel.findByIdAndUpdate(userId, {title, text, time, cyclicity})
   }

   async deleteRemind(_id){
      return await remindModel.findByIdAndDelete(_id)
   }

   async postReminds(userId){
      return await remindModel.find({userId})
   }

   // async getReminds(owner){
      // const remind = await remindModel.findOne({owner})
   // }

}

module.exports = new RemindService()