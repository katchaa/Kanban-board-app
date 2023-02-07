const Card = require('../db/models/Card');
const Project = require('../db/models/Project');
const Task = require('../db/models/Task');

exports.post = async (req, res) => {
	const data = req.body;
	//je potřeba posílat projectId v req
	const card = await Card.create({ ...data });
	await Project.findByIdAndUpdate(
		{ _id: data.projectId },
		{
			$push: {
				cards: {
					...card,
				},
			},
		},
		{ new: true }
	);
	res.status(201).json(card);
};

exports.edit = async (req, res) => {
	const card = await Card.updateOne(
		{ _id: req.params.id },
		{ $set: req.body }
	);

	res.status(200).json(card);
};

exports.delete = async (req, res) => {
	const card = await Card.findOne({ _id: req.params.id });
	await Project.findOneAndUpdate(
		{ _id: card.projectId },
		{
			$pull: {
				cards: req.params.id,
			},
		}
	);
	await Task.deleteMany({ cardId: req.params.id });
	await Card.findOneAndDelete({ _id: req.params.id });
	res.status(200).json(card);
};

