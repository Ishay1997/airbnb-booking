const express = require('express');
const multer = require("multer");
const photosMiddleware = multer({ dest: "uploads/" });
const router = express.Router();
const { upload, uploadByLink } = require('./controller');

router.post('/upload', photosMiddleware.array("photos", 100), upload);
router.post('/uploadByLink', uploadByLink);

module.exports = router;