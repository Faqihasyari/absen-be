const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nim: {
            type: DataTypes.STRING,
            unique: true
        },
        jabatan: {
            type: DataTypes.STRING
        },
        role: {
        type: DataTypes.ENUM("admin", "anggota"),
        defaultValue: "anggota"
        },
        qr_token: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: true,
        indexes: [{
            unique: true,
            fields: ["nim"]
        },
        {
            unique: true,
            fields: ["qr_token"]
        }
        ]
    }
);

module.exports = User;