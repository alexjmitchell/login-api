const UserService = require('../services/user_services');

class StaticController {
	static async home(request, response, next) {
		try {
			await response.render('index.ejs', {
				user: await UserService.getUserByEmail('alex@email.com')
			});
		} catch (error) {
			throw error;
		}
	}
}

module.exports = StaticController;
