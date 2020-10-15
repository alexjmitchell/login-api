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
			const { email, password, name } = request.body;
			const result = await UserService.registerUser(email, password, name);

			if (result.user && result.user != null) {
				response
					.status(result.status)
					.json({ message: 'you have been registered', user: result.user });
			} else {
				response.status(result.status).json({ error: result.error });
			}
		} catch (error) {
			response.status(result.status).json({ error: result.error });
		}
	}

	static async postToLoginPage(request, response, next) {
		try {
			const { email, password } = request.body;
			const result = await UserService.loginUser(email, password);

			if (result.user && result.user != null) {
				const user = result.user;

				response.cookie('accessToken', result.tokens[0], {
					maxAge: 1000 * result.maxAge,
					httpOnly: true
				});

				response.status(result.status).json({
					message: `${user.name} has been logged in`,
					user: user,
					error: result.error
				});
			} else {
				response.status(result.status).json({
					error: result.error
				});
			}
		} catch (err) {
			response.status(500).json({
				error: err
			});
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
