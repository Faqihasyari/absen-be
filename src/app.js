require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes.js")
const meetingRoutes = require("./routes/meetings.routes.js")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/meetings", meetingRoutes);


app.get("/", (req, res) => {
  res.send("API Absensi HIMASANTIKA 🚀");
});

module.exports = app;
