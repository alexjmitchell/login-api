const { authenticate } = require('passport');

const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const init = (passport, getUserByEmail, userPassword) => {
	const authenticateUser = async (email, password, done) => {
		try {
			const user = await getUserByEmail(email);
			if (user == null) {
				return done(null, false, { message: 'no user with that email' });
			}

			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: 'password is incorrect' });
			}
		} catch (error) {
			return done(error);
		}
	};

	passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser));

	passport.serializeUser((user, done) => done(null, user.id));

	passport.deserializeUser((id, done) => {});
};

module.exports = init;
