const User = require("../models/users");
const { generateJWT } = require("../utils/token");
const { hash, compare } = require("../utils/bcrypt");


const createUser = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await hash(password);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const createdUser = await User.create({
      email: email,
      password: hashedPassword
    });
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }


};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        message: 'Invalid email'
      });;
    }

    const validCrendentials = await compare(password, existingUser.password);

    if (!validCrendentials) {
      return res.status(401).json({
        message: 'Invalid password'
      });
    }

    const token = generateJWT({ _id: existingUser._id, email });

    res.status(200).json({ id: existingUser._id, favorites: existingUser.favorites, token: `Bearer ${token}`, email: existingUser.email });

  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { createUser, login };