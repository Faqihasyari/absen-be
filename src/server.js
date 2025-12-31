require("dotenv").config();
const sequelize = require("./config/database");
const app = require("./app");

const PORT = process.env.PORT || 3000;

require("./models");

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database berhasil tehubung");

        await sequelize.sync({ force: true });
        console.log("Table synced");

        app.listen(PORT, () => {
            console.log(`Server berjalan di port ${PORT}`);
        });
    } catch (error){
        console.error("Gagal terhubung ke database", error);
    }
};

startServer();