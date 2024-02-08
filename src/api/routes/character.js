const { getCharacters, insertCharacters } = require("../controllers/character");

const characterRouter = require("express").Router();

characterRouter.get("/", getCharacters);
characterRouter.post("/", insertCharacters)

module.exports = characterRouter;