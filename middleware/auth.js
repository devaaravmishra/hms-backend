const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.verifyToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	// Bearer <token>
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

exports.generateToken = (req, res) => {
	const accessToken = generateAccessToken(req.user);
	res.json({ accessToken: accessToken });
	console.info(`Welcome back, ${req.user.email}`);
};

const generateAccessToken = (user) => {
	return jwt.sign({ user }, JWT_SECRET, { expiresIn: "30m" });
};
