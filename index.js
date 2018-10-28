const express  = require('express');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const loggerMiddleware = require('./middlewares/logger');
const homeRoute = require('./routers/home');
const genreRoute = require('./routers/genres');
const customerRoute = require('./routers/customers');
const movieRoute = require('./routers/movies');
const rentalRoute = require('./routers/rentals');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movie-rentals', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  app.use(loggerMiddleware);
  debug("Morgan enabled");
}
debug("NODE_ENV: ", process.env.NODE_ENV)
debug("DEBUG: ", process.env.DEBUG)
const port = process.env.PORT || 3000;

app.use("/api", homeRoute);
app.use('/api/genres', genreRoute);
app.use('/api/customers', customerRoute);
app.use('/api/movies', movieRoute);
app.use('/api/rentals', rentalRoute);

app.listen(port, () => console.log(`Listening on port ${port}...`));