const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');



const { Pool } = require('pg');
const { promisify }= require('util');

const { database } = require('./keys');

const app = express();



app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views') ,'layouts'),
    partialsDir:path.join(app.get('views') ,'partials'),
    extname : '.hbs'
}));



app.set('view engine', '.hbs');



app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());






app.use(require('./routes/index'));
app.use(require('./routes/apuestas'));
app.use(require('./routes/partidos'));




app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool(database);

pool.connect((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected');

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);




module.exports= app, pool;
