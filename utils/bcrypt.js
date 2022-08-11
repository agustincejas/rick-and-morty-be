const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = async (plainValue) => {
  try {
    return await bcrypt.hash(plainValue, saltRounds);
  } catch (error) {
    console.error(error);
  }
};

const compare = async (plainValue, hashedValue) => {
  try {
    return await bcrypt.compare(plainValue, hashedValue);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { compare, hash };