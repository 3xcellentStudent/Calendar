require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./routes/routes')

const PORT = process.env.PORT || 6100
mongoose.set('strictQuery', false)

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
   credentials: true,
   origin: process.env.CLIENT_URL
}))
app.use('/api', router)

const start = async () => {
   try {
      await mongoose.connect(process.env.MONGODB).then(() => console.log('Connected to MongoDB...'))
      app.listen(PORT, () => console.log(`Server has been started on PORT: ${PORT}...`))
   } catch(err){console.log(err)}
}
start()