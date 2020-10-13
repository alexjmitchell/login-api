const jwt = require('jsonwebtoken');

const authenticateToken = (request, response, next) => {
	try {
		const accessToken = request.cookies.accessToken;

		if (accessToken != '') {
			jwt.verify(accessToken, process.env.TOKEN_SECRET);
			const decodedToken = jwt.decode(accessToken);

			const user = decodedToken.user;

			request.status = 200;
			request.loggedIn = true;
			request.user = user;

			next();
		} else {
			request.loggedIn = false;
			request.user = null;
			request.status = 400;
			request.error = 'incorrect or missing cookie';
			return;
		}
	} catch (error) {
		request.loggedIn = false;
		request.user = null;
		request.status = 401;
		request.error = 'missing or incorrect token';
		next();
	}
};

const currentUser = (request, response, next) => {
	authenticateToken(request, response, next);
	if (request.loggedIn) {
		const user = request.user;

		console.log('currently logged in user ===========>>>>>', user);
	} else {
    console.log("<<<<<<<<<<<============== no user is currently logged in ===========>>>>>>>>>")
  }
};
module.exports = { authenticateToken, currentUser };
