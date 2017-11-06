const db = require("../../../backend/db.js");

module.exports = function(o){

	return function(fn)
	{
		db.all("SELECT * FROM students", function(err, list){
			var theme = {
				"el": "#content",
				"data" :
				{
					students : list
				}
			}
			fn(theme);
		});
	}
}