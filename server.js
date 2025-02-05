const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Person = require('./models/person');
const Menu = require('./models/menu');
const db = require('./db');
const MenuItemRoutes = require('./routes/MenuItemRoutes');
const PersonRoutes = require('./routes/PersonRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Logging Middleware
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
  next();
};

app.use(logRequest);

// Passport Local Strategy
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await Person.findOne({ username });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Invalid password.' });
    }
  } catch (err) {
    return done(err);
  }
}));

// Routes

const LocalAuthMiddleware=passport.authenticate('local',{session:false})    ;
app.get('/',function (req, res){
  res.send('Welcome to my hotel');
});

app.use('/menu', MenuItemRoutes);
app.use('/person',LocalAuthMiddleware, PersonRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});