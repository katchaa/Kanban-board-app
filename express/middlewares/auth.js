const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.TOKEN_SECRET;

const auth = async (req, res, next) => {
	const token = req.cookies.jwt;
	if (!token) {
		res.status(403);
		throw Error('Access denied');
	}
	const decoded = await jwt.verify(token, secret);
	req.userId = decoded.id;
	return next();
};

module.exports = auth;
