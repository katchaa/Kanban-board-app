const Card = require('../db/models/Card');
const Project = require('../db/models/Project');
const Task = require('../db/models/Task');
const User = require('../db/models/User');

exports.post = async (req, res) => {
	const data = req.body;
	const project = await Project.create({ ...data, userId: req.userId });
	await User.findByIdAndUpdate(
		{ _id: req.userId },
		{
			$push: {
				projects: {
					...project,
					userId: req.userId,
				},
			},
		},
		{ new: true }
	);
	res.status(201).json(project);
};

exports.edit = async (req, res) => {
	const project = await Project.updateOne(
		{ _id: req.params.id },
		{ $set: req.body }
	);

	res.status(200).json(project);
};

exports.delete = async (req, res) => {
	await User.findByIdAndUpdate(
		{ _id: req.userId },
		{
			$pull: {
				projects: req.params.id,
			},
		}
	);
	const cards = await Card.find({ projectId: req.params.id });
	for (const card of cards) {
		await Task.deleteMany({ cardId: card._id });
	}
	await Card.deleteMany({ projectId: req.params.id });
	const project = await Project.deleteOne({ _id: req.params.id });
	res.status(200).json(project);
};

