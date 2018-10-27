const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.json())

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

app.use('/api/blogs', require('./controllers/blogs'))

const startApplication = () => {
  const connectDatabase = () => {
    const mongoUrl = process.env.BLOGLIST_MONGODB_URL
    mongoose.connect(mongoUrl)
  }

  const listenPort = port => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }

  connectDatabase()
  listenPort(3000)
}

startApplication()