const express = require("express");
const router = express.Router();

const { judicialController } = require("../controllers");

router.post("/post", judicialController.judicial.post);
router.get("/accept", judicialController.accept.get);
router.get("/dismiss", judicialController.dismiss.get);

module.exports = router;
