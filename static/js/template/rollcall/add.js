const db = require("../../../../backend/db.js");

$(document).on('submit', "#rollcall-add-form", function()
{
	var _self = this;
	var time = $("#time").val().match("([0-9]{4})-(0?[1-9]|1[0-2])-(0?[0-9]|[1-2][0-9]|3[01])");
	if(!time)
	{
		alert("تاریخ اشتباه است");
		return;
	}
	console.log(time);
	time[2] = Number(time[2]) < 10 ? "0"+ Number(time[2]) : Number(time[2]);
	time[3] = Number(time[3]) < 10 ? "0"+ Number(time[3]) : Number(time[3]);
	time[0] = time[1] + "-" + time[2] + "-" + time[3];
	console.log(time[0]);
	db.run(
		"INSERT INTO rollcall (`student_id`, `unit_id`, `time`, `absence`) VALUES (?, ?, ?, ?);",
		[
		$("#student").val(),
		$("#unit").val(),
		time[0],
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
				$("<tr>"+
					"<td>"+(rows.name + " " + rows.family)+"</td>"+
					"<td>" + rows.unique_code + "</td>"+
					"<td>" + rows.unit_title + " | ترم"+ rows.term +"</td>"+
					"<td>" + time[0] +"</td>"+
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