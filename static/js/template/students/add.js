const db = require("../../../../backend/db.js");
const $ = require('../../jquery.js');

$(document).on('submit', "#student-add-form", function()
{
	var _self = this;
	db.run(
		"INSERT INTO students (`unique_code`, `ncode`, `name`, `family`, `fname`) VALUES (?, ?, ?, ?, ?)",
		[
			$("#unique_code").val(),
			$("#ncode").val(),
			$("#name").val(),
			$("#family").val(),
			$("#fname").val()
		], function(error)
		{
			if(error)
			{
				alert(error);
				return;
			}
			$("<tr><td>"+
				($("#name").val() + " " + $("#family").val())+
				"</td><td>"+$("#fname").val()+
				"</td><td>"+$("#ncode").val()+
				"</td><td>"+$("#unique_code").val()+"</td></tr>").appendTo($("#list tbody"));
			var first = $("#list").is('.hidden');
			if(first)
			{
				 $("#list").fadeIn('fast');
			}
			$(_self)[0].reset();
		});
});