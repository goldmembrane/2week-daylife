const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");

router.post("/signUp", userController.signUp.post);
router.post("/signIn", userController.signIn.post);
router.post("/signOut", userController.signOut.post);
router.get("/info", userController.userInfo.get);
router.put("/info", userController.userInfo.put);

module.exports = router;
