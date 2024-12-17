const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let usuario = req.session.user;
  if(req.cookies.username){
    usuario = req.cookies;
	  console.log(usuario)
  }
  console.log(usuario)
  res.render('index', { user: usuario});
});

module.exports = router;
