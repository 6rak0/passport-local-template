module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.status(401).json({ message: 'Acceso no autorizado' });
  }
}

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
      next();
  } else {
      res.status(401).json({ message: 'Acceso no autorizado, solo administradores.' });
  }
}