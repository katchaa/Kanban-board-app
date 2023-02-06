const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;
const connectDB = require('./db/index');
const routes = require('./routes/index');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running at http://localhost:${PORT}`);
	});
});
