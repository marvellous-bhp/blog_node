const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/user');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
}).single('image');

router.post('/upload', (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Upload failed', error: err });
    } else if (err) {
      return res.status(400).json({ message: 'Upload failed', error: err });
    }

    const image = await User.findById(req.session.userId).updateOne({
      avatar: req.file.filename,
      avatar_path: req.file.path
    });

    db.insert(image, (err, newImage) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving image', error: err });
      }

      return res.status(200).json({ message: 'Image uploaded', filename: newImage.filename });
    });
  });
});

module.exports = router;
