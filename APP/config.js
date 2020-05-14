'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api', api)

module.exports = app

module.exports = {
  port: process.env.PORT || 3001,
  db: process.env.MONGODB_URI|| 'mongodb://localhost:27017/taxis',
  SECRET_TOKEN: '2Abril2020Quito'
}
module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB_URI|| 'mongodb://localhost:27017/taxis',
    SECRET_TOKEN: '2Abril2020Quito'
  }

//puerto url, variables de entorno, token
