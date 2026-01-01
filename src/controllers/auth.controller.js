const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.login = async (req, res) => {
    try {
        const { nama,nim } = req.body;

        // validasi input
        if (!nama || !nim) {
            return res.status(400).json({
                message: "Nama dan NIM wajib diisi"
            });
        }

        const user = await User.findOne({ where: { nama, nim } });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        const token = jwt.sign({
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    res.json({
        message: "Login berhasil",
        token,
        user: {
            id: user.id,
            nama: user.nama,
            nim: user.nim,
            jabatan: user.jabatan,
            role: user.role
        }
    })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};