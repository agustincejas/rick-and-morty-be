const User = require("../models/users");

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { favorites } = req.body;
  const idFromToken = req.id;

  if (id !== idFromToken) {
    return res.status(401).json({ message: 'Unathorized' });
  }

  try {
    const existingUser = await User.findById(id, { favorites: 1, email: 1 });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    existingUser.favorites = favorites;
    await existingUser.save();
    res.status(200).json(existingUser);
  } catch (error) {
    console.log(error);
    res.status(409).json(error);
  }
};

module.exports = { updateUser };