const Sequelize = require('sequelize');

const sequelize = require('../database/connection');

const User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: {
				args: [4, 15],
				msg: 'name must be between 4 and 15 characters'
			}
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: {
			args: true,
			msg: 'That email is already registered. Please use a unique email.'
		},
		validate: {
			isEmail: {
				args: true,
				msg: 'Please enter a valid email address'
			}
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = User;
