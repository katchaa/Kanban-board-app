const router = require('express').Router();

const userRoutes = require('./user');
const projectRoutes = require('./project');

router.use(userRoutes);
router.use('/project', projectRoutes);

module.exports = router;

