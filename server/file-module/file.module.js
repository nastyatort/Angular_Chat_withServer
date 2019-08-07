const multer = require("multer");

module.exports = {
    setFile: function (req, res, next) {
        let fileData;
        console.log(req.file);
        if (req.file === undefined) {
            res.send(fileData);
        } else {
            fileData = req.file.originalname;
            filePath = req.file.path;
            res.send(fileData);
        }
    },

    storage:
        storageConfig = multer.diskStorage({
            destination: (req, file, next) => {
                next(null, './uploads');
            },
            filename: (req, file, next) => {
                next(null, file.originalname);
            }
        }),

    filter:
        fileFilter = (req, file, cb) => {
            if (file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg") {
                cb(null, true);
            }
            else {
                cb(null, false);
            }
        }
}