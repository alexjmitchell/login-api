const User = require('../models/user');
const ErrorController = require('../controllers/error_controller');
const UserErrorController = require('../controllers/userError_controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

class UserService {
	static async getUserByEmail(email) {
		try {
			const user = await User.findAll({ where: { email: email } });
			if (user) {
				return user[0].dataValues;
			} else {
				return null;
			}
		} catch (error) {
			throw error;
		}
	}

	static async registerUser(request, response) {
		try {
			const { email, name, password } = request.body;

			if (password.length < 8 || password.length > 50) {
				ErrorController.customHandler(
					response,
					401,
					'Password needs to be between 8 and 15 characters'
				);

				return null;
			}

			const hashedPassword = await bcrypt.hash(password.trim(), 10);
			const user = await User.create({
				name: name.trim().toLowerCase(),
				email: email.trim().toLowerCase(),
				password: hashedPassword
			});

			if (user) {
				return user;
			} else {
				return null;
			}
		} catch (error) {
			response.status(401).json({
				error: UserErrorController.userRegistrationHandler(error)
			});
		}
	}

	static async loginUser(request, response) {
		const { email, password } = request.body;
		try {
			if (email && password) {
				const user = await User.findOne({
					where: { email: email.toLowerCase() }
				});
				console.log('user =========>>>>', user);
				const confirmedPassword = user
					? await bcrypt.compare(password, user.password)
					: '';

				if (user && confirmedPassword) {
					const accessToken = jwt.sign(
						{ user: user },
						process.env.TOKEN_SECRET
					);
					await response
						.status(200)
						.json({ message: `logged in, ${user.name}`, accessToken });
					return user;
				} else {
					ErrorController.customHandler(response, 401, 'failed to login user');
					return null;
				}
			} else {
				ErrorController.customHandler(
					response,
					404,
					'missing parameters for password or email'
				);

				return null;
			}
		} catch (error) {
			throw error;
		}
	}
}

module.exports = UserService;
