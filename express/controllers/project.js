const Project = require('../db/models/Project');
const User = require('../db/models/User');

// exports.getAll = async (req, res) => {
// 	const projects = await Project.find();
// };

exports.post = async (req, res) => {
	const data = req.body;
	const project = await Project.create({ ...data, userId: req.userId });
	const user = await User.findByIdAndUpdate(
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
	console.log(user);
	res.status(200).json(project);
};

exports.edit = async (req, res) => {
	const project = await Project.updateOne(
		{ _id: req.params.id },
		{ $set: req.body }
	);

	res.status(200).json(project);
};

exports.delete = async (req, res) => {
	const project = await Project.findByIdAndDelete({ _id: req.params.id });
	res.status(200).json(project);
};

