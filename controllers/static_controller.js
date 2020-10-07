const UserService = require('../services/user_services');

class StaticController {
	static async home(request, response, next) {
		try {
			if (request.loggedIn) {
				response.status(request.status).json({ message: 'hello world' });
			} else {
				response
					.status(request.status)
					.json({ loggedIn: request.loggedIn, error: request.error });
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = StaticController;
