require("dotenv").config();
const sequelize = require("./config/database");

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database berhasil tehubung");
        process.exit(0);
    } catch (error){
        console.error("Gagal terhubung ke database", error);
    }
})();