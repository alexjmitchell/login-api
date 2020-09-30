const ErrorController = require('./error_controller');

class UserErrorController extends ErrorController {
	static userRegistrationHandler(errorArray) {
		let error = '';

		if (errorArray) {
			for (let i = 0; i < errorArray.errors.length; i++) {
				error = errorArray.errors[i].message;
			}
		}
		return error;
	}
}

module.exports = UserErrorController;
