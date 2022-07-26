const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const newsRouter = require('./routes/news');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const key = process.env.secretKey;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(express.json());
app.use(cookieParser(key));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api/news', newsRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
