if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



const sequelize = require('./database/connection');
const staticRoute = require('./routes/static');
const adminRoute = require('./routes/admin');

app.use(bodyParser.json());
app.use(cookieParser());


app.use(adminRoute);
app.use(staticRoute);

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
