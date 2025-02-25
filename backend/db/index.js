const mongoose = require("mongoose");

const connectInfo = {
  USER_NAME: "eliyevaminayee",
  PASSWORD: "minaye12345",
  DATABASE_NAME: "e-commerce-react",
};

const connetctionDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${connectInfo?.USER_NAME}:${connectInfo?.PASSWORD}@cluster0.3tjld.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("mongodb baglantisi kuruldu");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connetctionDb };
