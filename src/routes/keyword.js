const express = require("express");
const router = express.Router();

const { keywordController } = require("../controllers");

router.get("/keyword/get", keywordController.keyword.get);
router.post("/keyword/post", keywordController.keyword.post);
router.delete("/keyword/delete", keywordController.keyword.delete);

module.exports = router;
