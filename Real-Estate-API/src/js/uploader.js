const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: function (req, file, cb) {
    cb(null, file.originalname + '.jpg');
  }
});

const uploader = multer({
  storage: storage,
  limits: {fileSize: 10485760}, // Accept up to 10 MBs file.
}).any();

module.exports = uploader;
