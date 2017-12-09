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
					$("#remove-callroll").click(function()
					{
						$("#remove-modal").modal({
							onApprove : function()
							{
								var id = $("#remove-callroll").attr('data-id');
								var router = require('../../../backend/router.js')
								db.get("DELETE FROM rollcall WHERE id = ?",[id], function(err){
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
					var DateP = $('#time-st').persianDatepicker({
						initialValue: true,
						initialValueType: 'persian',
						format: 'YYYY-MM-DD',
						calendar : {
							persian : {
								locale : 'fa',
							}
						}
					});
					var DateTime = $('#time-st').attr('data-date').match(/^([0-9]{4})[-\/](0?[1-9]|1[0-2])[-\/](0?[0-9]|[1-2][0-9]|3[01])$/)
					DateP.setDate(new persianDate([parseInt(DateTime[1]), parseInt(DateTime[2]), parseInt(DateTime[3])]))
				}
			}
			fn(theme);
		})
}
}