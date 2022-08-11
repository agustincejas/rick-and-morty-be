const axios = require('axios');

const getAllCharacters = async (req, res) => {
  try {
    const response = await axios.get(process.env.RICK_AND_MORTY_API);
    res.status(200).json(response.data);
  } catch (error) {
    const { status } = error.response;
    res.status(status).json({ message: error });
  }
};

const getCharacter = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${process.env.RICK_AND_MORTY_API}/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    const { status } = error.response;
    res.status(status).json({ message: error });
  }
};

module.exports = { getAllCharacters, getCharacter };