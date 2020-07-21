const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");

router.post("/signUp", userController.signUp.post);
router.post("/singIn", userController.signIn.post);
router.post("/singOut", userController.signOut.post);
router.get("/info", userController.userInfo.get);

module.exports = router;
