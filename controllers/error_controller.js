class ErrorController {
	static customHandler(response, statusNumber, errorMessage) {
		return response.status(statusNumber).json({ error: errorMessage });
	}

	static page_404(request, response, next) {
		response.status(404).json({
			error: 'Page not found'
		});
	}
}

module.exports = ErrorController;
