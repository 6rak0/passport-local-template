const router = require('express').Router()
const User = require('mongoose').model('User')
const passport = require('passport')
const genPassword = require('../lib/passwordUtils').genPassword
const { isAuth, isAdmin } = require('./auth')

// ---POST---

router.post('/registro', (req, res) => {
  const saltHash = genPassword(req.body.password)
  const salt = saltHash.salt
  const hash = saltHash.hash

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
    isAdmin: req.body.isAdmin
  })
  
  newUser.save()
  .then()
  .catch(err => {
    res.json({message : err.message})
  })
  .finally(() => res.status(200).json({ success: true, msg: 'usuario creado correctamente' }))
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ success: true, msg: 'usuario conectado correctamente' })
});

// ---GET---

router.get('/protegido', isAuth, (req, res) =>{
  res.status(200).json({ success: true, msg: 'usuario autorizado' })
})

router.get('/admin', isAdmin, (req, res) =>{
  res.status(200).json({ success: true, msg: 'usuario autorizado' })
})

router.get('/logout', isAuth, (req, res) => {
  req.logout()
  res.status(200).json({ success: true, msg: 'usuario desconectado' })
})

module.exports = router