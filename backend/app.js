const express = require("express");
const cors = require("cors");
const { connetctionDb } = require("./db");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
connetctionDb();
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
