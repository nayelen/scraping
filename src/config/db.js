const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_DB)
    console.log("Conectado a la BBDD 🎉");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDB };