const config = require("../../config.json");
module.exports = function(o){
	return {
		"el": "#content",
		"data" :
		{
			"message" : "fuck",
			"activeDatabase" : config.sys && config.sys.db ? true : false
		}
	}
}