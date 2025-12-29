require("dotenv").config();
const sequelize = require("./config/database");
const app = require("./app");

// import mode user
require("./models/User")
require("./models/meetings")

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database berhasil tehubung");

        await sequelize.sync({alter: true});
        console.log("Table synced");

        require("./models");

        await sequelize.sync({alter: true});
        console.log("Table & relasi berhasil di sync");
        process.exit(0);
        // app.listen(PORT, () => {
        //     console.log(`Server berjalan di port ${PORT}`);
        // });
    } catch (error){
        console.error("Gagal terhubung ke database", error);
        process.exit(1);
    }
})();