require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes"));

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API Absensi HIMASANTIKA 🚀");
});

module.exports = app;
