const projectRoutes = require('express').Router();
const projectController = require('../controllers/project');
const auth = require('../middlewares/auth');

projectRoutes.post('/', auth, projectController.post);

projectRoutes
	.use(auth)
	.route('/:id')
	.patch(projectController.edit)
	.delete(projectController.delete);

module.exports = projectRoutes;

