// src/server.js
require("dotenv").config();
const sequelize = require("./config/database");
const app = require("./app");

const PORT = process.env.PORT || 3000;

require("./models");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))


    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
