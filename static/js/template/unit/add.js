const db = require("../../../../backend/db.js");

$(document).on('submit', "#unit-add-form", function()
{
	var _self = this;
	db.run(
		"INSERT INTO units (`unit_title`, `term`) VALUES (?, ?)",
		[
			$("#unit_title").val(),
			$("#term").val(),
		], function(error)
		{
			if(error)
			{
				alert(error);
				return;
			}
			$("<tr><td>"+$("#unit_title").val()+
				"</td><td>"+$("#term").val()+"</td></tr>").appendTo($("#list tbody"));
			var first = $("#list").is('.hidden');
			if(first)
			{
				 $("#list").fadeIn('fast');
			}
			$(_self)[0].reset();
		});
});