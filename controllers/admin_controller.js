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
			response
				.status(500)
				.json({ message: 'something went wrong', error: error });
		}
	}

	static async postToLoginPage(request, response, next) {
		try {
			await UserService.loginUser(request, response);
		} catch (err) {
			throw err;
		}
	}

	static isUserLoggedIn(request, response, next) {
		try {
			const cookies = request.cookies;
			const accessToken = cookies.accessToken;

			jwt.verify(accessToken, process.env.TOKEN_SECRET);

			const decodedToken = jwt.decode(accessToken);

			const user = decodedToken.user;

			response.json({ accessToken, user, loggedIn: true });
		} catch (error) {
			response.status(400).json({ loggedIn: false, error: error });
		}
	}

	static logout(request, response, next, calledByPath = true) {
		response.cookie('accessToken', '', { maxAge: 1 });
		if (calledByPath) {
			response.json({ message: 'logged out' });
		}
	}

	static async update(request, response, next) {
		const user = request.user;
		console.log('user ======<<<<<<<', user);
		const { email, password, name } = request.body;
		console.log('users email, pass, and name =======<<>>><><><', [
			email,
			password,
			name
		]);
		try {
			const updatedUser = await UserService.updateUser(
				user,
				email,
				password,
				name
			);

			console.log('updated user ==========>>>>', updatedUser);
			if (updatedUser && updatedUser != 'fail') {
				response.status(201).json({
					message: 'User has been updated',
					user: updatedUser
				});

				request.user = updatedUser;
			} else {
				response.status(400).json({
					error: updatedUser,
					message: 'failed to update user'
				});
			}
		} catch (error) {
			response.status(400).json({
				error: error,
				message: 'failed to update user'
			});
		}
	}

	static async delete(request, response, next) {
		const user = request.user;

		const result = await UserService.deleteUserById(user.id);

		if (result.userDeleted) {
			response.cookie('accessToken', '', { maxAge: 1 });
			response.status(200).json({
				message: 'User was deleted'
			});
		} else {
			response.status(400).json({
				message: 'User was not deleted',
				error: result.error
			});
		}
	}
}

module.exports = AdminController;
