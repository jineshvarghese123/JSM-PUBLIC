const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //-Get token from the header
  const token = req.header('x-auth-token');

  //check if no token
  if (!token) {
    return res.status(401).json({
      msg: 'No token , Authorization Denied',
    });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // console.log('decoded', decoded.user);
    req.user = decoded.user;
    // req.body.user_id = decoded.user.id;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).send('token is not valid');
  }
};
