const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");

const MONGO_URI = process.env.MONGO_URI;

mongoose
	.connect(MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		console.info(`Connected to database`);
	})
	.catch(() => {
		console.error(`Error connecting to database`);
	});

app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.use("/", (req, res) => {
	res.status(200).send("Hello World!");
});

module.exports = app;
