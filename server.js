require('dotenv').config()
const PORT = process.env.PORT || 3000

const express = require('express')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')
const routes = require('./routes')
const connection = require('./config/database')
const MongoStore = require('connect-mongo')(session)

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true}))

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions'})

server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000*60*60*24*15
  }
}))

server.use(passport.initialize())
server.use(passport.session())

server.use(routes)

server.listen(PORT, console.log(`server listening on port ${PORT}`))