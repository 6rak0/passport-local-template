const { Schema, model } = require('mongoose')

const User = new Schema({
  username: String,
  hash: String,
  salt: String,
  isAdmin: Boolean
})

model('User', User)

