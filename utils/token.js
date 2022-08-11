const jwt = require('jsonwebtoken');

const generateJWT = (payload) => {
  try {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' });

  } catch (error) {
    console.log(error);
  }
};

const validateJWT = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
};

module.exports = { generateJWT, validateJWT };