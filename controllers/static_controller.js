class StaticController {
	static async home(request, response, next) {
		try {
			await response.render('index.ejs');
		} catch (error) {
			throw error;
		}
	}
}

module.exports = StaticController;
