const {Permissions,User, Meetings} = require("../models");

// create pengajuan izin
exports.createPermission = async (req, res) => {
    try {
    const {user_id, meeting_id, alasan} = req.body;

    // cek user
    const user = await User.findByPk(user_id);
    if (!user) {
        return res.status(404).json({message: "User tidak ditemukan"});
    }

    const meeting = await Meetings.findByPk(meeting_id);
    if (!meeting) {
        return res.status(404).json({message: "Rapat tidak ditemukan"});
    }

    const permission = await Permissions.create({
        user_id,
        meeting_id,
        alasan
    });

    res.status(201).json({
        message: "Permohonan izin berhasil dikirim",
        data: permission
    });
    
} catch (error) {
    res.status(500).json({error: error.message});
}

};

// get semua permission
    exports.getPermissions = async (req, res) => {
        try {
            const permissions = await Permissions.findAll({
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "nama", "nim"]
                    },
                    {
                        model: Meetings,
                        as: "meeting",
                        attributes: ["id", "nama_rapat", "tanggal"]
                    }
                ]
            });

            res.json({
                message: "Daftar izin berhasil diambil",
                data: permissions
            });

        } catch (error) {
            res.status(500).json({error: error.message});
        }
    };

// update status permission
exports.updatePermissionStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;

        if (!["disetujui", "ditolak"].includes(status)) {
            return res.status(400).json({
                message: "Status tidak valid"
            });
        }

        const permission = await Permissions.findByPk(id);
        if (!permission) {
            return res.status(404).json({
                message: "Permission tidak ditemukan"
            });
        }

        permission.status = status;
        await permission.save();

        res.json({
            message: "Status berhasil diperbarui",
            data: permission
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};