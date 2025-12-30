const { Meetings } = require("../models");

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