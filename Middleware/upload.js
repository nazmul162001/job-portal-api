const multer = require('multer');
const Upload_File = "Upload/"
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, Upload_File)
    },
    filename: (req, file, cb) => {
        const extName = path.extname(file.originalname)
        const fileName = file.originalname.replace(extName, "").split(" ").join("-") + "-" + Date.now()
        cb(null, fileName + extName)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 2000000 // 2MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "application/pdf") {
            cb(null, true)
        } else {
            cb(new Error("Only pdf file format is accepted."))
        }
    }
})

module.exports = upload