const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({
	username: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	projects: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Project',
		},
	],
});

module.exports = mongoose.model('User', UserSchema);

