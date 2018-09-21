const express  = require('express');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const loggerMiddleware = require('./middlewares/logger');
const homeRoute = require('./routers/home');
const genreRoute = require('./routers/genres');
const app = express();

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

app.listen(port, () => console.log(`Listening on port ${port}...`));