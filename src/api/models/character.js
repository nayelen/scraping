const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
}, {
  timestamps: true,
  collection: "character"
});

const Character = mongoose.model("Character", characterSchema, "character")
module.exports = Character;