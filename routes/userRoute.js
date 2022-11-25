const express = require("express");
const userController = require("../controller/userController");
const auth = require("../middleware/auth");

router = express();

router.get("/view", userController.view);
router.get("/getApt/:userId", auth.verifyToken, userController.getApt);
router.post("/login", userController.login, auth.generateToken);
router.post("/makeApt", auth.verifyToken, userController.makeApt);
router.post("/signup", userController.signup);
module.exports = router;
