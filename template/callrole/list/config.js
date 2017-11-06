const db = require("../../../backend/db.js");

module.exports = function(o){

	return function(fn)
	{
		db.all("SELECT students.*, rollcall.time, rollcall.absence, units.unit_title FROM rollcall INNER JOIN students ON students.id = rollcall.student_id INNER JOIN units ON units.id = rollcall.unit_id", function(err, list){
			var theme = {
				"el": "#content",
				"data" :
				{
					rollcall : list
				}
			}
			fn(theme);
		});
	}
}