const express = require("express");
const router = express.Router();

const { judicialController } = require("../controllers");

router.post("/post", judicialController.judicial.post);

module.exports = router;
