const router = require('express').Router();

const userRoutes = require('./user');
const projectRoutes = require('./project');
const cardRoutes = require('./card');

router.use(userRoutes);
router.use('/project', projectRoutes);
router.use('/card', cardRoutes);

module.exports = router;

