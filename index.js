const express = require('express');
const app = express();
const axios = require('axios');

app.post('/heroku-postdeploy', function (req, res) {
	axios({
		url: 'https://api.travis-ci.org/repo/yewtu%2Ftestsuite-marketplace/requests',
		method: 'post',
		data: {
			request: {
				branch: "master"
			}
		},
		headers: {
			"Content-Type": "application/json",
			"Travis-API-Version": "3",
			"Authorization": "token stzoGLUJ7Cf_V6G2FS4uyg"
		},
		responseType: 'json'
	})
		.then(response => res.json(response))
		.catch(err => res.status(500).send(err.message));
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})