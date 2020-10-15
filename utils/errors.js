module.exports.BAD_REQUEST = (status, msg) => {
	return {
		status: status,
		error: msg
	};
};
