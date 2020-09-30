class ErrorController {
	static customHandler(response, statusNumber, errorMessage) {
		return response.status(statusNumber).json({ error: errorMessage });
	}
}

module.exports = ErrorController;
