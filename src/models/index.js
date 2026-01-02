const User = require("./User");
const Attendance = require("./attendance");
const Meetings = require("./meetings");
const Permissions = require("./permissions");

// menambahkan relasi

// user ke permission
User.hasMany(Attendance, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Attendance.belongsTo(User, {
    foreignKey: "user_id"
});

// meetings ke attendance
Meetings.hasMany(Attendance, {
    foreignKey: "meeting_id",
    onDelete: "CASCADE"
});

// meetings ke permission
Meetings.hasMany(Permissions, {
    foreignKey: "meeting_id",
    onDelete: "CASCADE"
});
Permissions.belongsTo(Meetings, {foreignKey : "meeting_id", as: "meeting"});

User.hasMany(Meetings, {foreignKey: "creatorId"});
Meetings.belongsTo(User, {
    foreignKey: "creatorId",
    as: "creator"
})

User.hasMany(Permissions, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});
Permissions.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

module.exports = {
    User,
    Meetings,
    Attendance,
    Permissions
};
