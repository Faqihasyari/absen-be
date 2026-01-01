const {User, Meetings, Attendace, Attendance} = require("../models");

exports.scanAttendance = async (req, res) => {
    try {
        const {qr_token, meeting_id, status} = req.body;

        // mencari user berdasarkan qr token
        const user = await User.findOne({
            where: { qr_token }
        });

        if (!user) {
            return res.status(404).json({
                message: "Scan QR gagal"
            });
        }

        // ngecek meeting
        const meeting = await Meetings.findByPk(meeting_id);
        if (!meeting) {
            return res.status(404).json({
                message: "Rapat tidak ditemukan"
            });
        }

        // cek status rapat
        if (meeting.status !== "Sedang berlangsung"){
            return res.status(400).json({
                message: "Rapat sudah selesai, absensi telah ditutup!!"
            });
        }

        // cek apakah user sudah absen apa belum
        const existingAttendance = await Attendance.findOne({
            where: {
                user_id: user.id,
                meeting_id: meeting.id
            }
        });

        if (existingAttendance){
            return res.status(400).json({
                message: "User sudah melakukan absensi"
            });
        }

        // orang yang sudah izin tidak bisa scam absensi
        const permission = await Permissions.findOne({
            where: {
                user_id: user.id,
                meeting_id: meeting.id
            }
        });

        if (permission) {
            return res.status(400).json({
                message: "Tidak bisa absensi karena sudah mengajukan izin"
            });
        }

        // validate kalo qr token dan meeting id kosong
        if (!qr_token || !meeting_id) {
            return res.status(400).json({
                message: "qr_token dan meeting_id wajib diisi"
            });
        }


        // menyimpan absensi
        const attendance = await Attendance.create({
            user_id: user.id,
            meeting_id: meeting.id,
             status: status || "hadir"
        });

        res.status(201).json({
            message: "Absensi berhasil",
            data: {
                nama: user.nama,
                rapat: meeting.nama_rapat,
                status: attendance.status,
                waktu_scan: attendance.waktu_scan
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};