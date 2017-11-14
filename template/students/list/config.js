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
				},
				bindJS : function()
				{
					$(".popup").popup({
						context : 'body',
						hoverable  : true,
						position   : 'bottom right',
						delay: {
							show: 0,
							hide: 0
						}
					})
				}
			}
			fn(theme);
		});
	}
}