const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Person = require('./models/person');
const Menu = require('./models/menu');
const app = express();
const db = require('./db');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Welcome to my hotel... How can I help you? We have a lot on our list.');
});

const MenuItemRoutes=require('./routes/MenuItemRoutes')
app.use('/menu',MenuItemRoutes)

const PersonRoutes = require('./routes/PersonRoutes')
app.use('/person',PersonRoutes)

app.listen(9000, () => {
  console.log('Server running on port 9000');
});
