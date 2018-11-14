const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if(!token) return res.status(config.get('jwt.errors.unAuthorized.code'))
    .send(config.get('jwt.errors.unAuthorized.message'));
  try{
    const decoded = jwt.verify(token, config.get('jwt.secretKey'));
    req.user = decoded;
    next();
  }
  catch(ex){
    return res.status(config.get('jwt.errors.invalidToken.code'))
      .send(config.get('jwt.errors.invalidToken.message'));
  }
}