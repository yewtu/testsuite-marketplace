exports.command = function(userName){
	this
		.log(`Log in`)
		.click('.t-btn-open-login')
		.setVal('[name="userName"]', userName)
		.click('.t-btn-submit-login');
	return this;
};
