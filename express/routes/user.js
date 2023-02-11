const userRoutes = require('express').Router();
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);
userRoutes.post('/logout', userController.logout);

userRoutes
	.use(auth)
	.get('/user/me', userController.getMe)
	.patch('/user/edit', userController.editUser)
	.patch('/user/change-password', userController.changePassword)
	.delete('/user/delete-user', userController.deleteUser);
module.exports = userRoutes;

