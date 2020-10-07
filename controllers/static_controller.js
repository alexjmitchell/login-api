const UserService = require('../services/user_services');

class StaticController {
	static async home(request, response, next) {
		try {
			response.json({ message: 'hello world' });
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = StaticController;
