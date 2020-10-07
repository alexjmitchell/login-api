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

			response.json({ accessToken, user, loggedIn: true });

			next();
		}
	} catch (error) {
		response.status(400).json({ loggedIn: false, error: error });
		next();
	}
};
