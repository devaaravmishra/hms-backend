const express = require("express");
const userController = require("../controller/userController");

router = express();

router.get("/login", userController.login);
router.post("/makeApt", userController.makeApt);
router.post("/signup", userController.signup);

module.exports = router;
