const UserService = require('../services/user_services');
const jwt = require('jsonwebtoken');

class AdminController {
	static showLoginPage(request, response, next) {
		response.json({ message: 'login page' });
	}

	static showRegisterPage(request, response, next) {
		response.json({ message: 'registration page' });
	}

	static async postToRegisterPage(request, response, next) {
		try {
			const user = await UserService.registerUser(request, response);

			if (user) {
				response
					.status(201)
					.json({ message: 'you have been registered', user: user });
			}
		} catch (error) {
			response.status(500).json({ message: 'something went wrong' });
		}
	}

	static async postToLoginPage(request, response, next) {
		try {
			await UserService.loginUser(request, response);
		} catch (err) {
			throw err;
		}
	}
}

module.exports = AdminController;
