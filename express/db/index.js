const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
	await mongoose.connect(
		process.env.MONGO_URI,
		{
			useNewURLParser: true,
		},
		() => {
			console.log('DB connected');
		}
	);
};

module.exports = connectDB;

