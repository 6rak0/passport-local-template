const { Schema, model } = require('mongoose')
const connection = require('../config/database')

const UserSchema = new Schema({
  username: String,
  hash: String,
  salt: String,
  isAdmin: Boolean
})

const User = connection.model('User', UserSchema)

module.exports = User