const Sequelize = require('sequelize');

const sequelize = new Sequelize('admin_api', 'alexmitchell', '', {
	dialect: 'postgres',
	host: 'localhost'
});

module.exports = sequelize;
