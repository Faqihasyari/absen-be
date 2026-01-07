const { Meetings, User, Attendance } = require("../models");

exports.createrMeetings = async (req, res) => {
  try {
    const { nama_rapat, tanggal } = req.body;
    const creatorId = req.user.id

    if (!nama_rapat) {
    return res.status(400).json({
        message: "nama_rapat wajib diisi"
    });
    }


    const meeting = await Meetings.create({
      nama_rapat,
      tanggal,
      creatorId
    });

    res.status(201).json({
      message: "Rapat berhasil dibuat",
      data: meeting,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getMeetings = async (req, res) => {
    try {
        const meetings = await Meetings.findAll({
            order:[["tanggal", "DESC"]],
            attributes: ['id', 'nama_rapat', 'tanggal', "status"],
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

exports.getMeetingsDetail = async (req, res) => {
    try {
        const { id } = req.params;

        // declare meeting untuk mendapatkan datanya
        const meeting = await Meetings.findByPk(id, {
            attributes: ["id", "nama_rapat", "tanggal", "status"],
            include: [
                {
                    model: Attendance,
                    attributes: ["id", "status" ],
                    include: [
                        {
                            model: User,
                            attributes: ["id", "nama", "nim", "jabatan"]
                        }
                    ]
                }
            ]
        });

        // Jika meeting false maka kirim pesan ini
        if (!meeting) {
            return res.status(404).json({
                message: "Rapat tidak ditemukan"
            });
        }

        // jika berhasil maka tampillkan data meeting
        res.status(200).json({
            message: "detail rapat berhasil diambil",
            data: meeting
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// update status rapat
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["Sedang berlangsung", "Selesai"].includes(status)) {
            return res.status(400).json({
                message: "Status tidak valid"
            });
        }

        const meeting = await Meetings.findByPk(id);
        if (!meeting) {
            return res.status(404).json({
                message: "Rapat tidak ditemukan"
            });
        }

        // tidak bisa diubah saat sudah di selesaikan
        if (meeting.status === "Selesai") {
            return res.status(400).json({
                message: "Rapat sudah selesai dan tidak bisa diubah"
            });
        }

        meeting.status = status;
        await meeting.save();

        res.json({
            message: "Status rapat berhasil diubah",
            data: meeting
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};