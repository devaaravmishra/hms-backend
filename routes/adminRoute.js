const express = require("express");
const adminController = require("../controller/adminController");

const router = express();

router.post("/addDoc", adminController.addDoc);
router.get("/login", adminController.login);
router.post("/signup", adminController.signup);

module.exports = router;
