const express = require('express');
const app = express();

const sequelize = require('./database/connection');
const staticRoute = require('./routes/static');
const adminRoute = require('./routes/admin');
const User = require('./models/user');

app.set('view-engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(adminRoute);
app.use(staticRoute);

sequelize
	.sync()
	.then(() => {
		app.listen(3000);
	})
	.catch((error) => {
		console.log(error);
	});
