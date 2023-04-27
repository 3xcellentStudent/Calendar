const remindService = require('../services/remind-service')


class remindController{

   async createRemindController(req, res){
      try {
         const {userId, title, text, time, cyclicity} = JSON.parse(req.body.params)
         const remind = await remindService.createRemind(userId, title, text, time, cyclicity)
         return res.json(remind)
      } catch (err){console.log(err)}
   }
   
   async updateRemindController(req, res){
      try {
         const {remindId, title, text, time, cyclicity} = req.body.params.changedData
         const remind = await remindService.updateRemind(remindId, title, text, time, cyclicity)
         return res.json(remind)
      } 
      catch (err){console.log(err)}
   }
   
   async deleteRemindController(req, res){
      try {
         const _id = req.body._id
         const remind = await remindService.deleteRemind(_id)
         return res.json(remind)
      } catch (err){console.log(err)}
   }

   async postRemindsController(req, res){
      try {
         const {userId} = req.body.params
         const reminds = await remindService.postReminds(userId)
         return res.json(reminds)
      } catch (err){console.log(err)}
   }

}

module.exports = new remindController()