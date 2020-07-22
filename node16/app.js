var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


//CREATE EXPRESS APP
app.use(cors());
app.use(bodyParser.json());
 
// DECLARE JWT-secret
const JWT_Secret = 'tecsup2019';
var testUser = { email: 'tecsup@mai.com', password: '123456'};

app.post('/api/authenticate', (req, res) => {
 
  if (req.body) {
    var user = req.body;
    console.log(user)
 
    if (testUser.email===req.body.email && testUser.password === req.body.password) {
      var token = jwt.sign(user, JWT_Secret);
      res.status(200).send({
        signed_user: user,
        token: token
      });
    } else {
      res.status(403).send({
        errorMessage: 'Authorisation required!'
      });
    }
  } else {
    res.status(403).send({
      errorMessage: 'Please provide email and password'
    });
  }
 
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => console.log('Server started on port 3000'));

module.exports = app;
