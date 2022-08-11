var MongooseFactory = require('./utils/db');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3001;

const authRouter = require('./routes/auth');
const charactersRouter = require('./routes/characters');
const usersRouter = require('./routes/users');
const { swaggerDocs } = require('./utils/swagger');

const app = express();


MongooseFactory.init();

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || process.env.WHITE_LISTED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,

};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/users', usersRouter);

//TODO ADD VALIDATION, TODO ADD TESTS

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
  swaggerDocs(app, port);
});

module.exports = app;
