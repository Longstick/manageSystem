const jwt = require('jsonwebtoken')
const manage = require('../model/manage')

module.exports = async(req,res,next) => {
  let token = req.headers.authorization
  token = token ? token.split(' ')[1] : null
  if(!token) {
    console.log(1);
    return res.status(401).end()
  }
  try {
    const decodedToken = jwt.verify(token,'Adhere')
    req.id=decodedToken.id
    next()
  } catch (error) {
    console.log(error);
    return res.status(401).end()
  }
}