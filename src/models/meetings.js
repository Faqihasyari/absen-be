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
        }
    }
);

module.exports = Meetings;