const bcrypt = require('bcrypt');
const User = require('../models/user');

class AdminController {
	static showLoginPage(request, response, next) {
		response.render('login.ejs');
	}

	static showRegisterPage(request, response, next) {
		response.render('register.ejs');
	}

	static async postToRegisterPage(request, response, next) {
		try {
			const hashedPassword = await bcrypt.hash(request.body.password, 10);
			let user = await User.create({
				name: request.body.name,
				email: request.body.email,
				password: hashedPassword
			});

			response.redirect('/login');
		} catch (error) {
			response.redirect('/register');
		}
	}

	static postToLoginPage(request, response, next) {}
}

module.exports = AdminController;
