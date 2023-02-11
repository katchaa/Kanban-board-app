const cardRoutes = require('express').Router();
const cardController = require('../controllers/card');
const auth = require('../middlewares/auth');

cardRoutes.post('/', auth, cardController.post);

cardRoutes
	.use(auth)
	.route('/:id')
	.patch(cardController.edit)
	.delete(cardController.delete);

module.exports = cardRoutes;

