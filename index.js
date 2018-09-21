const express  = require('express');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug("Morgan enabled");
}
debug("NODE_ENV: ", process.env.NODE_ENV)
debug("DEBUG: ", process.env.DEBUG)
const port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
  debug("Morgan enabled");
  return res.send("Hello World...");
})

app.listen(port, () => console.log(`Listening on port ${port}...`));