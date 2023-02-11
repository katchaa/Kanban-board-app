const Task = require('../db/models/Task');
const Card = require('../db/models/Card');

exports.post = async (req, res) => {
	const data = req.body;
	const task = await Task.create(data);
	await Card.findByIdAndUpdate(
		{ _id: data.cardId },
		{
			$push: {
				tasks: {
					...task,
				},
			},
		},
		{ new: true }
	);

	res.status(201).json(task);
};

exports.edit = async (req, res) => {
	const task = await Task.updateOne(
		{ _id: req.params.id },
		{ $set: req.body }
	);
	res.status(200).json(task);
};

exports.delete = async (req, res) => {
	const task = await Task.findOne({ _id: req.params.id });
	await Card.findOneAndUpdate(
		{ _id: task.cardId },
		{
			$pull: {
				tasks: req.params.id,
			},
		}
	);
	await Task.deleteOne({ _id: req.params.id });
	res.status(200).json(task);
};

exports.dragNdrop = async (req, res) => {
	const task = await Task.findOne({ _id: req.params.id });
	const prevCard = await Card.findOne({ _id: task.cardId });
	const nextCard = await Card.findOne({ _id: req.body });

	await Card.findByIdAndUpdate(
		{ _id: prevCard._id },
		{
			$pull: {
				tasks: req.params.id,
			},
		}
	);
	await Card.findByIdAndUpdate(
		{ _id: nextCard._id },
		{
			$push: {
				tasks: req.params.id,
			},
		}
	);
	const drop = await Task.updateOne(
		{ _id: req.params.id },
		{ $set: { cardId: req.body } }
	);
	res.status(200).json(drop);
};
