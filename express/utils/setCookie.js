const setCookie = async (res, token) => {
	return res.cookie('jwt', token, {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 30,
		secure: process.env.NODE_ENV === 'production' ? false : true,
		domain:
			process.env.NODE_ENV === 'production'
				? 'localhost'
				: process.env.PROD_DOMAIN,
	});
};

const clearCookie = async (res) => {
	return res.clearCookie('jwt', {
		httpOnly: true,
		maxAge: 10,
		secure: process.env.NODE_ENV === 'production' ? false : true,
		domain:
			process.env.NODE_ENV === 'production'
				? 'localhost'
				: process.env.PROD_DOMAIN,
	});
};

module.exports = {
	setCookie,
	clearCookie,
};
