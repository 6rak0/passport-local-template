const mongoose = require('mongoose')

require('dotenv').config()

const devConnection = process.env.DB_STRING
const prodConnection = process.env.DB_STRING_PROD
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

if (process.env.NODE_ENV === 'production'){
  mongoose.connect(prodConnection, options)
  mongoose.connection.on('connected', () => console.log('conectado a la base de datos'))
} else {
  mongoose.connect(devConnection, options)
  mongoose.connection.on('connected', () => console.log('conectado a la base de datos'))
}
