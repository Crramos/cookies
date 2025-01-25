// Importar las bibliotecas
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const express = require('express');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const listaRouter = require('./routes/lista');
const restrictedRouter = require('./routes/restricted');
const registerRouter = require('./routes/register');
const cookiesRouter = require('./routes/cookies');

// Crear la aplicación
const app = express();

app.locals.title = "Demo Login";

// Configurar el middleware de Cookie Parser
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "La frase que querais",
  resave: false,
  saveUninitialized: true
}));

app.use((req,res,next) => {
  const message = req.session.message;
  const error = req.session.error;
  delete req.session.message;
  delete req.session.error;
  res.locals.message = "";
  res.locals.error = "";
  if(message){res.locals.message = `<p>${message}</p>`};
  if(error){res.locals.error = `<p>${error}</p>`};
  next();
});


app.use('/', indexRouter, cookiesRouter);
app.use('/login', loginRouter);
app.use('/lista', listaRouter);
app.use('/register', registerRouter);
app.use('/restricted', restricted, restrictedRouter);
app.use('/logout', (req,res) =>{
  req.session.destroy();
  res.clearCookie('cookiesConsent');
  res.clearCookie('username');
  res.redirect("/");
});

function restricted(req, res, next){
  if(req.session.user || req.cookies.username){
    next();
  } else {
    res.redirect("login");
  }
}
module.exports = app;
