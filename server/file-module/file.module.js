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
    }
}