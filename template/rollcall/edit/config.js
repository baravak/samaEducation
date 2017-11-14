const db = require("../../../backend/db.js");
module.exports = function(o){
	return function(fn)
	{
		db.get(`SELECT students.*, rollcall.id AS rid, rollcall.time, rollcall.absence, rollcall.justified, rollcall.cause, units.unit_title, units.term FROM rollcall INNER JOIN students ON students.id = rollcall.student_id INNER JOIN units ON units.id = rollcall.unit_id WHERE rid=${o.property.id}`, function (err, list) {
			var theme = {
				"el": "#content",
				"data" :
				{
					student : list
				},
				"bindJS" : function()
				{
					$('.ui.slider').checkbox();
					$('#absent').change(function()
					{
						if($(this).is(':checked'))
						{
							$("#lag").attr('disabled', 'disabled');
						}
						else
						{
							$("#lag").removeAttr('disabled');
						}
					});
				}
			}
			fn(theme);
		})
	}
}