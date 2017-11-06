const db = require("../../../../backend/db.js");

$(document).on('submit', "#callrole-add-form", function()
{
	var _self = this;
	db.run(
		"INSERT INTO rollcall (`student_id`, `unit_id`, `time`, `absence`) VALUES (?, ?, ?, ?);",
		[
		$("#student").val(),
		$("#unit").val(),
		$("#time").val(),
		$('#absent').is(":checked") ? 0 : $("#lag").val()
		], function(error, rows)
		{
			if(error)
			{
				alert(error);
				return;
			}
			db.get("SELECT students.*, units.* FROM rollcall INNER JOIN students ON students.id=rollcall.student_id INNER JOIN units ON units.id=rollcall.unit_id ORDER BY rollcall.id DESC LIMIT 1", function(error, rows){
				if(error)
				{
					alert(error);
					return;
				}
				console.log(rows);
				$("<tr>"+
					"<td>"+(rows.name + " " + rows.family)+"</td>"+
					"<td>" + rows.unique_code + "</td>"+
					"<td>" + rows.unit_title + " | ترم"+ rows.term +"</td>"+
					"<td>" + $("#time").val() +"</td>"+
					"<td>" + ($('#absent').is(":checked") ? 'غیبت' : 'تاخیر ' +$("#lag").val() + "دقیقه")  +"</td>"+
					"</tr>").appendTo($("#list tbody"));
				var first = $("#list").is('.hidden');
				if(first)
				{
					$("#list").fadeIn('fast');
				}
				$(_self)[0].reset();
			});
		});
});