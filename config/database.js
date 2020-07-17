require('dotenv').config()

const mongoose = require('mongoose')

const db = process.env.DB_URI

const connection = mongoose.createConnection(db , {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = connection