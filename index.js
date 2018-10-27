const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', require('./controllers/blogs'))

const server = http.createServer(app)

const startApplication = () => {
  const connectDatabase = () => {
    mongoose
      .connect(config.dbUrl)
      .catch(e => console.log(e))
  }

  const listenPort = port => {
    server.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }

  connectDatabase()
  listenPort(config.port)
}

startApplication()

server.on('close', () => mongoose.connection.close())

module.exports = {
  app, server
}