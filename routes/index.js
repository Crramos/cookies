const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let usuario;
  if(req.cookies.username){
    usuario = req.cookies;
	  console.log(usuario)
  }else{
    usuario = req.session.user;
  }
  console.log(usuario)
  res.render('index', { user: usuario, cookies: req.cookies.cookiesConsent});
});

module.exports = router;
