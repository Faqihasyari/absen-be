const { v4: uuidv4 } = require("uuid");
const { User } = require("../models");
const generatorQR = require("../utils/generateQR");

exports.createUser = async (req, res) => {
    try {
        const { nama, nim, jabatan } = req.body;

        const qr_token = uuidv4();
        const qr_code = await generatorQR(qr_token);

        const user = await User.create({
            nama,
            nim,
            jabatan,
            qr_token
        });

        res.status(201).json({
            message: "Anggota Himasantika berhasil ditambahkan",
            data: user,
            qr_code
        });
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
