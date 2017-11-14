const db = require("../../../backend/db.js");
module.exports = function(o){
	if(o.property.id)
	{
		return function(fn)
		{
			db.get(`
				SELECT * FROM students WHERE id = ?`, [o.property.id], (err, student) => {
					var theme = {
						"el": "#content",
						"data" :
						{
							"student" : student
						},
						bindJS : function()
						{
							console.log(1)
							$("#remove-student").click(function()
							{
								$("#remove-modal").modal({
									onApprove : function()
									{
										var id = $("#remove-student").attr('data-id');
										var router = require('../../../backend/router.js')
										db.get("DELETE FROM students WHERE id = ?1; DELETE * FROM rollcall WHERE student_id = ?1",[id], function(err){
											if(err)
											{
												alert(err);
											}
											else
											{
												$("#remove-modal").modal('hide');
												history.back()
											}
										});
										return false;
									}
								});
								$("#remove-modal").modal('show');
							})
						}
					}
					fn(theme)
				})
}
}
return {
	"el": "#content",
	"data" : {
		student : false
	}
}
}