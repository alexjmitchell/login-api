const jwt = require('jsonwebtoken');

/**
 * This is a function to create an authentication token utilizing jsonwebtokens
 * @function createToken
 * @param {{user: {id: Number, name: String}}} payload - an object that should contain info you want stored in token.
 * @param {String} secret - a long hashed string, should be secure.
 * @param {Number} expirationDate - Should be a number expressed in seconds for how long you want the token to last before expiration
 * @return {void} - This function does not return anything
 */
const createToken = (payload, secret, expirationDate) => {
	return jwt.sign(payload, secret, {
		expiresIn: expirationDate
	});
};

module.exports.createToken = createToken;
