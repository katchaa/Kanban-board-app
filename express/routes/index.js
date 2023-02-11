const router = require('express').Router();

const userRoutes = require('./user');
const projectRoutes = require('./project');
const cardRoutes = require('./card');
const taskRoutes = require('./task');

router.use(userRoutes);
router.use('/project', projectRoutes);
router.use('/card', cardRoutes);
router.use('/task', taskRoutes);

module.exports = router;

