require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connetctionDb } = require("./db");
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
connetctionDb();
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
