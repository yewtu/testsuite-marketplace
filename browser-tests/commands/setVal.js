exports.command = function(sel, val){
	// Fix for setValue() not clearing value first.
	// https://github.com/nightwatchjs/nightwatch/issues/4

	this.clearValue(sel);
	this.setValue(sel, val);
	this.execute(function(){});
	return this;
};
