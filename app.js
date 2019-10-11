const express = require('express')
const layouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport =require('passport')


const app = express()

//passport config
require('./config/passport')(passport)

//DB Config
const db = require('./config/keys').MongoURI

//connect to Mongo 
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('mongodb Connected...'))
    .catch(err => console.log(err))

//Ejs

app.set('view engine','ejs')



//css
app.use('/public', express.static('public'));


//Bodyparser
app.use(express.urlencoded({extended: false}))

//Express Session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  //passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  

// connect flash
app.use(flash());

//global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  })
//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

const PORT = process.env.PORT || 2000

app.listen(PORT, console.log(`Server started on port ${PORT}`))