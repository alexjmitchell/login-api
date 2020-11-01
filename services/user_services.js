const models = require('../models/index');
const User = models.users;
const ErrorController = require('../controllers/error_controller');
const UserErrorController = require('../controllers/userError_controller');
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/jsonwebtoken');

/**
 *
 * @class UserService
 *
 * This is a class for doing CRUD calls for user controller.
 */
class UserService {
	/**
	 * This is a function.
	 * @function registerUser
	 * @param {String} email - Expects a properly formated email address.
	 * @param {String} password - Expects a password string of eight or more characters
	 * @param {String} name - Expects a name string of four or more characters
	 * @return {JSON} - An object that contains the user, a status, and any errors
	 */
	static async registerUser(email, password, name) {
		if (!email) {
			return {
				user: null,
				status: 422,
				error: 'Email is required !!!'
			};
		}

		if (!password) {
			return {
				user: null,
				status: 422,
				error: 'Password is required !!!'
			};
		}

		if (!name) {
			return {
				user: null,
				status: 422,
				error: 'Name is required !!!'
			};
		}

		if (password.length < 8 || password.length > 50) {
			return {
				user: null,
				status: 422,
				error: 'Password needs to be between 8 and 15 characters'
			};
		}

		const hashedPassword = await bcrypt.hash(
			password.trim() + process.env.SALT,
			10
		);
		let user = null;
		try {
			user = await User.create({
				name: name.trim().toLowerCase(),
				email: email.trim().toLowerCase(),
				password: hashedPassword
			});
		} catch (error) {
			return {
				user: null,
				status: 500,
				error: UserErrorController.userRegistrationHandler(error)
			};
		}

		if (!user) {
			return {
				user: null,
				status: 500,
				error: 'User not registered, please try again'
			};
		}

		return {
			user: {
				id: user.id,
				email: user.email,
				name: user.name
			},
			status: 200,
			error: {}
		};
	}

	static async loginUser(email, password) {
		if (!email || !password) {
			return {
				user: null,
				status: 404,
				error: 'Request must include ( email, password )'
			};
		}

		let user = null;
		try {
			user = await User.findOne({
				where: { email: email.toLowerCase() }
			});
		} catch (err) {
			return {
				status: 500,
				message: 'Error quering for User with provided params',
				error: err
			};
		}

		if (!user) {
			return {
				user: null,
				status: 404,
				error: 'User not found.'
			};
		}

		const confirmedPassword = user
			? await bcrypt.compare(password.trim() + process.env.SALT, user.password)
			: null;

		if (!confirmedPassword) {
			return {
				user: null,
				status: 401,
				error: 'Bad credentials'
			};
		}

		// Good math skillz ( WTF length of time is this? FYI: 86400 Seconds in a DAY )
		const maxAge = 60 * 60 * 3;

		const accessToken = createToken(
			{ user: { id: user.id, name: user.name, email: user.email } },
			process.env.TOKEN_SECRET,
			maxAge
		);

		return {
			user: {
				id: user.id,
				email: user.email,
				name: user.name
			},
			status: 200,
			error: {},
			maxAge: maxAge,
			tokens: [accessToken]
		};
	}

	static async updateUser(user, email, password, name) {
		const currentUser = await User.findOne({ where: { id: user.id } });
		let updatedUser = null;

		try {
			if ((password && password.length < 8) || password.length > 50) {
				ErrorController.customHandler(
					response,
					401,
					'Password needs to be between 8 and 15 characters'
				);

				return null;
			}

			const hashedPassword = await bcrypt.hash(
				password.trim() + process.env.SALT,
				10
			);

			updatedUser = await currentUser.update({
				name: name ? name : currentUser.name,
				email: email ? email : currentUser.email,
				password: password ? hashedPassword : currentUser.password
			});

			return updatedUser;
		} catch (error) {
			console.log(error);
		}
	}

	static async deleteUserById(userId) {
		try {
			const deletedUser = await User.destroy({ where: { id: userId } });

			return {
				userDeleted: true
			};
		} catch (error) {
			return {
				userDeleted: false,
				error: error
			};
		}
	}
}

module.exports = UserService;
