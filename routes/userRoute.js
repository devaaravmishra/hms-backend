const express = require("express");
const userController = require("../controller/userController");
const auth = require("../middleware/auth");

router = express();

router.get("/view", auth.verifyToken, userController.view);
router.get("/getApt/:userId", auth.verifyToken, userController.getApt);
router.post("/login", userController.login, auth.generateToken, (req, res) => {
	res.status(200).json({
		message: "Login Successful",
		accessToken: req.accessToken,
		user: req.user,
	});
	console.info(`Welcome back, ${req.user.email}`);
});
router.post("/makeApt", auth.verifyToken, userController.makeApt);
router.post("/signup", userController.signup);
module.exports = router;
