const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/heroku-postdeploy', function (req, res) {
	const message = `App: ${req.body.app}, Commit: ${req.body.head} - ${req.body.git_log}`;
	axios({
		url: 'https://api.travis-ci.org/repo/yewtu%2Ftestsuite-marketplace/requests',
		message,
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

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log(`App listening on port ${port}`);
});