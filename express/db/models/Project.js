const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = Schema({
	projectName: {
		type: String,
		required: true,
	},
	companyName: {
		type: String,
		required: true,
	},
	cover: {
		type: String,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	cards: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Card',
		},
	],
});

module.exports = mongoose.model('Project', ProjectSchema);

