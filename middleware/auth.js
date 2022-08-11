const { validateJWT } = require("../utils/token");


const securedUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { _id } = validateJWT(token);
    req.id = _id;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unathorized' });
  }
};

module.exports = { securedUser };