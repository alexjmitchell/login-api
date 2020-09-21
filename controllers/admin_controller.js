const UserService = require('../services/user_services');

class AdminController {
	static showLoginPage(request, response, next) {
		response.render('login.ejs');
	}

	static showRegisterPage(request, response, next) {
		response.render('register.ejs');
	}

	static async postToRegisterPage(request, response, next) {
		try {
			const user = UserService.registerUser(request);

			response.redirect('/login');
		} catch (error) {
			response.redirect('/register');
		}
	}

	static postToLoginPage(request, response, next) {
		const user = UserService.loginUser(request);
		request.user = user;
	}
}

module.exports = AdminController;
