const User = require("./User");
const Attendance = require("./attendance");

// menambahkan relasi
User.hasMany(Attendance, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Attendance.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = {
    User,
    Attendance
};
