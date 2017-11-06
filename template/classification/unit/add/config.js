const db = require("../../../../backend/db.js");
module.exports = function(o){
	return function(fn)
	{
		db.all("SELECT * FROM units", function(err, list){
			var theme = {
				"el": "#content",
				"data" :
				{
					units : list
				},
				"bindJS" : function()
				{
					$('.ui.selection.dropdown').dropdown();
				}
			}
			fn(theme);
		});
	}
}