const express = require('express')
const session = require('express-session')
const passport = require('passport')
const moongose = require('mongoose')
const MongoStore = require('connect-mongo')(session)

// configuración general

//puerto
const PORT = process.env.PORT || 3000
//acceso a variables de entorno
require('dotenv').config()
//crea el servidor express
const server = express()
//configura la base de datos y abre una conexión global que puede ser usada en cualquier modulo con 'mongoose.connection'
require('./config/database')
//carga de modelos
require('./models/user')
//inicializa el objeto 'passport' en todas las peticiones
//pasa el objeto global 'passport' hacia la función de configuración
require('./config/passport')(passport)
server.use(passport.initialize())
//uso de middlewares de express
server.use(express.json())
server.use(express.urlencoded({extended: true}))

const sessionStore = new MongoStore({ mongooseConnection: moongose.connection, collection: 'sessions'})

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

//routes

//importa las rutas definidas en /routes/index.js
server.use('/api', require('./routes/index'))

//configura la ruta para que el servidor despliegue el contenido estático (frontend)
if (process.env.NODE_ENV === 'production'){
  server.use(express.static('client/build'))
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//servidor

//puerto del servidor
server.listen(PORT, () => console.log(`servidor listo en puerto ${PORT}`))