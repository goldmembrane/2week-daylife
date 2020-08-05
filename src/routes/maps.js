const express = require("express");
const router = express.Router();

const { mapController } = require("../controllers");

router.get("/marker", mapController.marker.get);

module.exports = router;
