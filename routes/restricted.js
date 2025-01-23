var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let usuario;
  if(req.cookies.username){
    usuario = req.cookies;
	  console.log(usuario)
  }else{
    usuario = req.session.user;
  }
  console.log(usuario)
  res.render('restricted', { user: usuario, cookies: req.cookies.cookiesConsent});
});

module.exports = router;
