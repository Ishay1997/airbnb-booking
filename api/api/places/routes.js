const express = require("express");
const router = express.Router();
const { getPlaces, createNewPlace, getAccountPlaces } = require("./controller");

router.get("/", getPlaces);
router.post("/", createNewPlace);
// router.get('',getAccountPlaces)

module.exports = router;
