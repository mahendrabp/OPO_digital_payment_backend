const multer = require('multer');
const path = require('path');

const storageMulter = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/media/img/photo_profile');
  },
  filename: (req, file, callback) => {
    callback(null, req.body.name + Date.now() + file.originalname.slice(-4));
  },
});

const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.svg' && ext !== '.jpeg') {
    callback(null, false);
    return;
  }
  callback(null, true);
};

module.exports = multer({storage: storageMulter, fileFilter});
