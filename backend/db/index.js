require("dotenv").config(); // dotenv modulunu çağırırıq
const mongoose = require("mongoose");

const connetctionDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL); // MONGODB_URL dəyərini .env-dən oxuyur
    console.log("MongoDB bağlantısı uğurla quruldu");
  } catch (error) {
    console.log("MongoDB bağlantı xətası:", error);
  }
};

module.exports = { connetctionDb };
