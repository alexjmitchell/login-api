const jwt = require('jsonwebtoken');

// module.exports.authenticateToken = (request, response, next) => {
// 	const accessToken = request.cookies.accessToken;

// 	if (accessToken) {
// 		jwt.verify(accessToken, process.env.TOKEN_SECRET, (error, decodedToken) => {
// 			if (error) {
// 				response.status(400).json({ loggedIn: false, error: error });
// 			} else {
// 				const user = decodedToken.user;

// 				response.json({ accessToken, user, loggedIn: true });
// 				next();
// 			}
// 		});

// 		// console.log({ accessToken, user, loggedIn: true });
// 	} else {
// 		response.status(400).json({ error: 'missing token' });
// 	}
// };

module.exports.authenticateToken = (request, response, next) => {
	try {
		const accessToken = request.cookies.accessToken;

		if (accessToken) {
			jwt.verify(accessToken, process.env.TOKEN_SECRET);
			const decodedToken = jwt.decode(accessToken);

			const user = decodedToken.user;

			// response.json({ accessToken, user, loggedIn: true });
			request.status = 200;
			request.loggedIn = true;
			request.user = user;

			next();
		} else {
			// response.status(400).json({ loggedIn: false });
			request.loggedIn = false;
			request.user = null;
			request.status = 400;
			return;
		}
	} catch (error) {
		// response.status(400).json({ loggedIn: false, error: error });
		request.loggedIn = false;
		request.user = null;
		request.status = 400;
		request.error = error;
		next();
	}
};
