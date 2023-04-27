const {Schema, model} = require('mongoose')

const remindModel = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   title: {
      type: String,
      required: true,
   },
   text: {type: String,},
   time: {
      type: Number,
      required: true,
   },
   cyclicity: {type: String}
})

module.exports = model('Remind', remindModel)