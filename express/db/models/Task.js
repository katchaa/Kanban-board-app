const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = Schema({
	text: {
		type: String,
		required: true,
	},
	cardId: {
		type: Schema.Types.ObjectId,
		ref: 'Card',
		required: true,
	},
});

module.exports = mongoose.model('Task', TaskSchema);

