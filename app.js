var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/auth');
var languagesRouter = require('./routes/languages');


const {createClient} = require("redis");
const connectRedis =  require("connect-redis");
const mongoose =  require("mongoose");
const  RedisClient  = createClient({
    url:process.env.REDIS_URL,
    legacyMode:true
});

mongoose.connect(process.env.DATABASE_URL ,{useNewUrlParser:true})
const DB = mongoose.connection;


try {
    DB.on("error", (error)=>console.error(error));
   DB.once("open", ()=>console.log("Connected to Database 😎😍🤔😘"));
} catch (error) {
   console.log(error); 
}

const RedisStore =  connectRedis(session);
RedisClient.connect().catch(e=> console.log("Could not connect to redis", e));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 

const sessionConfig = {
  store:new RedisStore({client:RedisClient}),
  resave:false,
  saveUninitialized:false,
  secret:process.env.SESSION_SECRET,
  cookie:{
    secure:false,
    httpOnly:false,
    maxAge:1000 * 60 * 10
  }
};

app.use(session(sessionConfig))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/languages", languagesRouter);

app.use("/hello", (req, res)=>{
   if(req.session.viewCount === undefined){req.session.viewCount = 0}else{req.session.viewCount++;}
   res.send("View count is: " + req.session.viewCount)
});



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

app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;
