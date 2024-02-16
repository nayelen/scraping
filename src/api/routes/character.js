const { getCharacters } = require("../controllers/character");

const characterRouter = require("express").Router();

characterRouter.get("/", getCharacters);

module.exports = characterRouter;