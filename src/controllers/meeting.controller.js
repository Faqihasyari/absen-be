const { Meetings, User } = require("../models");

exports.createrMeetings = async (req, res) => {
    try {
        const {nama_rapat, tanggal} = req.body;

        const meeting = await Meetings.create({
            nama_rapat,
            tanggal,
        });

        res.status(201).json({
            message: "Rapat berhasil dibuat",
            data: meeting,
        })
    } catch (error) {
        res.status(500),json({error: error.message});
    }
}

exports.getMeeetings = async (req, res) => {
    try {
        const meetings = await Meetings.findAll({
            order:[["date", "DESC"]],
            attributes: ['nama_rapat', 'tanggal'],
            include: [
                {
                    model: User,
                    as: "creator",
                    attributes: ["id", "nama"]
                }
            ]
        });

        res.status(200).json({
            message: "Daftar Rapat Berhasil diambil",
            data: meetings
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};