const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const db = require('./db');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({db});
const passport = require('passport');

if (process.env.NODE_ENV !== 'production') require('../secrets');

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbStore.sync()

app.use(session({
  secret: process.env.SESSION_SECRET || 'an insanely wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));
  
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('*', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use( (req, res, next)=> {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


db.sync()
  .then(function(){
    console.log('Database Synced!');
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}`);
    });
  });





