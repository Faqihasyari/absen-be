const { DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Meetings = sequelize.define(
    "meetings", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nama_rapat:{
             type: DataTypes.STRING,
             allowNull: false
        },
        tanggal: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("Sedang berlangsung", "Selesai"),
            defaultValue: "Sedang berlangsung"
        }
    }
);

module.exports = Meetings;