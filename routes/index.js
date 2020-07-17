const router = require('express').Router()
const passport = require('passport')
const genPassword = require('../lib/passwordUtils').genPassword
const User = require('../models/user')
const { isAuth, isAdmin } = require('./auth')

// ---POST---

router.post('/registro', (req, res) => {
  const saltHash = genPassword(req.body.password)
  const salt = saltHash.salt
  const hash = saltHash.hash

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt
  })
  
  newUser.save().then(user => console.log(user)).catch(err => console.log(err))

  res.redirect('/login')
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: 'login-success' }));

// ---GET---

router.get('/', (req, res) => {
  res.send(`<p>hola este es el inicio<p>`)
})

router.get('/login', (req, res) => {
  const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
})

router.get('/registro', (req, res) => {
  const form = '<h1>registro</h1><form method="POST" action="/registro">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
})

router.get('/protected-route', isAuth, (req, res) => {
  res.send('You made it to the route.');
});

router.get('/admin-route', isAdmin, (req, res) => {
  res.send('You made it to the admin route.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
  res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
  res.send('You entered the wrong password.');
});

module.exports = router