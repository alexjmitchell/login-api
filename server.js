if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { authenticateToken, currentUser } = require('./middleware/auth');
const sequelize = require('./database/connection');
const staticRoute = require('./routes/static');
const adminRoute = require('./routes/admin');
const errorController = require('./controllers/error_controller');

app.use(bodyParser.json());
app.use(cookieParser());

app.use('*', currentUser);
app.use('/admin', authenticateToken, (request, response) => {
	if (request.loggedIn) {
		response
			.status(request.status)
			.json({ message: 'test for admin route', currentUser: request.user });
	} else {
		response
			.status(request.status)
			.json({ loggedIn: request.loggedIn, error: request.error });
	}
});
app.use(adminRoute);
app.use(staticRoute);

app.use(errorController.page_404);

const serverStart = async () => {
	try {
		await sequelize.sync();
		app.listen(process.env.PORT, () => {
			console.log('listening on port ===========<<<>>>>>', process.env.PORT);
		});
	} catch (error) {
		console.log('server error ===========>>>>>>', error);
	}
};

serverStart();
