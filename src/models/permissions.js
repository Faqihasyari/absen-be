const { DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Meetings = require("./meetings");

const Permissions = sequelize.define(
    "permission", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        alasan: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("disetujui", "ditolak"),
            defaultValue: "ditolak"
        }
    }
);

module.exports = Permissions;