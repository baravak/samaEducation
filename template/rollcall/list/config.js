const db = require("../../../backend/db.js");

module.exports = function(o){
	return function(fn)
	{
		db.all("SELECT students.*, rollcall.id AS rid, rollcall.time, rollcall.absence, rollcall.justified, rollcall.cause, units.unit_title, units.term FROM rollcall INNER JOIN students ON students.id = rollcall.student_id INNER JOIN units ON units.id = rollcall.unit_id", function(err, list){
			var theme = {
				"el": "#content",
				"data" :
				{
					rollcall : list
				},
				"bindJS" : function()
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