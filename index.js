const express  = require('express');
const config = require('config');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const loggerMiddleware = require('./middlewares/logger');
const homeRoute = require('./routers/home');
const genreRoute = require('./routers/genres');
const customerRoute = require('./routers/customers');
const movieRoute = require('./routers/movies');
const rentalRoute = require('./routers/rentals');
const userRoute = require('./routers/users');
const authRoute = require('./routers/auth');
const app = express();
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const dayjs = require('dayjs');
require('dayjs/locale/id');
dayjs.locale('id');

if(!config.get('jwt.secretKey')){
  debug("Please setting your jwt secret key on configs");
  process.exit(-1);
}

mongoose.connect(config.get('dbConfig.mongoUrl'), { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  app.use(loggerMiddleware);
  debug("Morgan enabled");
  debug("Date Now: ", dayjs().format());
}
debug("NODE_ENV: ", process.env.NODE_ENV)
debug("DEBUG: ", process.env.DEBUG)
const port = process.env.PORT || config.get("port") || 5000;

app.use("/api", homeRoute);
app.use('/api/genres', genreRoute);
app.use('/api/customers', customerRoute);
app.use('/api/movies', movieRoute);
app.use('/api/rentals', rentalRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(port, () => console.log(`Listening on port ${port}...`));