if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const sequelize = require('./database/connection');
const staticRoute = require('./routes/static');
const adminRoute = require('./routes/admin');
const UserService = require('./services/user_services');
// const initPassport = require('./passport_config');
// initPassport(passport, UserService.getUserByEmail);
const User = require('./models/user');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());

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
