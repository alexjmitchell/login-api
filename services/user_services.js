const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

	static async registerUser(request) {
		const hashedPassword = await bcrypt.hash(request.body.password, 10);
		const user = await User.create({
			name: request.body.name,
			email: request.body.email,
			password: hashedPassword
		});

		if (user) {
			return user;
		} else {
			return null;
		}
	}

	static loginUser(request) {
		const { email, password } = request.body;
		console.log(email);
	}
}

module.exports = UserService;
