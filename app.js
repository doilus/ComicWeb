var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('i18n');




var app = express();

const session = require('express-session');
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));
app.use((req, res, next) => {
   const loggedUser = req.session.loggedUser;
   res.locals.loggedUser = loggedUser;
   if(!res.locals.loginError) {
       res.locals.loginError = undefined;
   }
   next();
});

app.use(cookieParser('secret'));
i18n.configure({
  locales: ['pl', 'en'], // jezyki dostepne w aplikacji. Dla kaedego z nich nalezy utworzyc osobny slownik 
  directory: path.join(__dirname, 'locales'), // sciezka do katalogu, w ktorym znajduje sie slowniki
  objectNotation: true, // umozliwia korzstanie z zagniezdzonych kluczy w notacji obiektowej
  cookie: 'acme-hr-lang', //nazwa cookies, ktore nasza aplikacja bedzie wykorzystywac do przechowania informacji o 
  //jezyku aktualnie wybranym przez uzytkownika
});
app.use((req, res, next) => {
  if(!res.locals.lang) {
      const currentLang = req.cookies['acme-hr-lang'];
      res.locals.lang = currentLang;
  }
  next();
 });


app.use(i18n.init);



const authUtils = require('./util/authUtils');
var indexRouter = require('./routes/index');
const comicsRouter = require('./routes/comicsRoute');
const authorRouter = require('./routes/authorRoute');
const comicAuthorRouter = require('./routes/comic-authorRoute');
app.use('/authors/edit', authUtils.permitAuthenticatedUser, authorRouter);
app.use('/authors/delete', authUtils.permitAuthenticatedUser, authorRouter);
//app.use('/authors/add', authUtils.permitAuthenticatedUser, authorRouter);

//app.use('/comic-author/add', authUtils.permitAuthenticatedUser, comicAuthorRouter);
app.use('/comic-author/edit', authUtils.permitAuthenticatedUser, comicAuthorRouter);
app.use('/comic-author/delete', authUtils.permitAuthenticatedUser, comicAuthorRouter);

//app.use('/comics/add', authUtils.permitAuthenticatedUser, comicsRouter);
app.use('/comics/edit', authUtils.permitAuthenticatedUser, comicsRouter);
app.use('/comics/delete', authUtils.permitAuthenticatedUser, comicsRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));




app.use(express.static(path.join(__dirname, 'public')));

app.use('/comics', comicsRouter);
app.use('/authors', authorRouter);
app.use('/comic-author', comicAuthorRouter);
app.use('/', indexRouter);




// catch 404 and forward to error handler
app.use(function(err,req, res, next) {
  //next(createError(404));
  console.error(err.stack);
  res.status(500).send(err.stack);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

const sequelizeInit = require('./config/sequelize/init');
const AuthorComics = require('./model/sequelize/AuthorComics');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });
