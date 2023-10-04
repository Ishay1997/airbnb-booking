
const express = require("express");
const multer = require("multer");
const router = express.Router();
const { upload, uploadByLink , places} = require("./controller");
const photosMiddleware = multer({ dest: "uploads" });

router.post("/upload", photosMiddleware.array("photos", 100), upload);
router.post("/uploadByLink", uploadByLink);

module.exports = router;
