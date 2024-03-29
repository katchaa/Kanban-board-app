const taskRoutes = require('express').Router();
const taskController = require('../controllers/task');
const auth = require('../middlewares/auth');

taskRoutes.post('/', auth, taskController.post);
taskRoutes.patch('/dnd/:id', auth, taskController.dragNdrop);

taskRoutes
	.use(auth)
	.route('/:id')
	.patch(taskController.edit)
	.delete(taskController.delete);

module.exports = taskRoutes;
