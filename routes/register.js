const express = require('express');
const router = express.Router();
const database = require('../database');
const bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('register', {user: req.session.user});
});

router.post('/', async (req, res) => {
  const username = req.body.user;
  const pass = req.body.pass;
  // comprobar si ya está registrado el nombre 
  if(await database.users.register(username, pass)){
    req.session.user = {username: username};
    // comprobaciuón si las cookies fueron aceptadas
    if(req.cookies.cookiesConsent == 'accept'){
      res.cookie('username', user, { maxAge: 900000, httpOnly: true });
    }
    req.session.message = "Registro correcto!"
    res.redirect("/restricted");
  } else {
    req.session.error = "Ya existe ese username";
    res.redirect("/register");
  }
});

module.exports = router;
