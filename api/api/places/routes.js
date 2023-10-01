const express = require('express');
const router = express.Router();
const { createNewPlace } = require('./controller');

router.post('/', createNewPlace);

module.exports = router;