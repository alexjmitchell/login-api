if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

const sequelize = require('./database/connection');
const staticRoute = require('./routes/static');
const adminRoute = require('./routes/admin');
const UserService = require('./services/user_services');
const User = require('./models/user');

app.set('view engine', 'ejs');

app.use(bodyParser.json());

// app.use(flash());
// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET,
// 		resave: false,
// 		saveUninitialized: false
// 	})
// );

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
