const mongoose = require('mongoose');
const { Schema } = mongoose;

const CardSchema = Schema({
	title: {
		type: String,
		required: true,
	},
	projectId: {
		type: Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
	tasks: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Task',
		},
	],
});

module.exports = mongoose.model('Card', CardSchema);

