const Character = require("../models/character")
const characters = require("../../../character.json")

const getCharacters = async (req, res, next) => {
  try {
    const allCharacters = await Character.find()
    return res.status(200).json(allCharacters)
  } catch (error) {
    return res.status(400).json(error);

  }
}

const insertCharacters = async (req, res, next) => {
  try {
    await Character.insertMany(characters.results);
    return res.status(200).json("Characters inserted successfully")

  } catch (error) {
    return res.status(404).json(error)
  }
};
module.exports = { getCharacters, insertCharacters };