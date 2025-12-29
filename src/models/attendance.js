const { DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Meetings = require("./meetings");

const Attendance = sequelize.define(
    "attendace", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        },
        meeting_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Meetings,
                key: "id"
            }
        },
        status: {
            type: DataTypes.ENUM("hadir", "izin", "alfa"),
            defaultValue: "alfa"
        },
        waktu_scan: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }
);

module.exports = Attendance;