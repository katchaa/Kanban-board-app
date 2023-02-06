const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { setCookie, clearCookie } = require('../utils/setCookie');
const User = require('../db/models/User');
const secret = process.env.TOKEN_SECRET;

exports.register = async (req, res) => {
	const password = await bcrypt.hash(req.body.password, 10);
	const data = { ...req.body, password };
	const user = await User.create(data);
	const token = await jwt.sign({ id: user._id }, secret);
	await setCookie(res, token);
	res.json(user);
};

exports.login = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		res.status(404);
		throw Error('Wrong email');
	}
	const comparePassword = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!comparePassword) {
		res.status(404);
		throw Error('Wrong password');
	}

	const token = await jwt.sign({ id: user._id }, secret);
	await setCookie(res, token);
	res.json(user);
};

exports.logout = async (req, res) => {
	await clearCookie(res);
	res.json(res.cookies);
};

exports.getMe = async (req, res) => {
	const user = await User.findOne({ _id: req.userId });

	if (!user) {
		res.status(403);
		throw Error('Invalid token');
	}
	res.status(200).json(user);
};

exports.editUser = async (req, res) => {
	const editUser = await User.updateOne(
		{ _id: req.userId },
		{ $set: req.body }
	);

	res.status(200).json(editUser);
};

exports.changePassword = async (req, res) => {
	const { oldPassword, newPassword, confirmPassword } = req.body;
	const user = await User.findOne({ _id: req.userId });

	const compareOldPassword = await bcrypt.compare(oldPassword, user.password);
	if (!compareOldPassword) {
		res.status(400);
		throw Error('Wrong old password');
	}

	if (oldPassword === newPassword) {
		res.status(400);
		throw Error("New password can't be old password");
	}

	if (newPassword !== confirmPassword) {
		res.status(400);
		throw Error("Passwords don't match");
	}

	const hashed = await bcrypt.hash(req.body.newPassword, 10);
	const password = await User.updateOne(
		{ _id: req.userId },
		{ $set: { password: hashed } }
	);
	res.status(200).json(password);
};

exports.deleteUser = async (req, res) => {
	const user = await User.findOneAndDelete({ _id: req.userId });
	clearCookie(res);
	res.status(200).json(user);
};

