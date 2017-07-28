var util = require('util');
var events = require('events');

function getJSON() {
	events.EventEmitter.call(this);
}

util.inherits(getJSON, events.EventEmitter);

getJSON.prototype.command = function(path, cb) {
	var self = this;
	var request = require("request");
	if (!path) {
		return this;
	}

	request.get(path, function (error, response) {
		if (error) {
			console.log(error);
			return;
		}

		if (cb) cb.call(self.client.api, JSON.parse(response.body));
		self.emit('complete');
	});

	return this;
};

module.exports = getJSON;