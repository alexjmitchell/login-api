class AdminController {
	static showLoginPage(request, response, next) {
		response.render('login.ejs');
	}

	static showRegisterPage(request, response, next) {
		response.render('register.ejs');
	}

	static postToRegisterPage(request, response, next) {}

	static postToLoginPage(request, response, next) {}
}

module.exports = AdminController;
