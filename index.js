require("dotenv").config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const { scraper } = require("./src/utils/scraper");
const characterRouter = require("./src/api/routes/character");

const app = express();

connectDB()
app.use(express.json());
app.use("/api/v1/characters", characterRouter);

app.use("*", (req, res, next) => {
  return res.status(404).json("Route not found")
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
})

scraper("https://www.starwars.com/databank")