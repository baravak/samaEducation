const db = require("../../../../backend/db.js");

$(document).on('submit', "#rollcall-edit-form", function(){
	var time = $("#time-st").val().parseEn();
	time = time.match(/^([0-9]{4})[-\/](0?[1-9]|1[0-2])[-\/](0?[0-9]|[1-2][0-9]|3[01])$/);
	time[2] = Number(time[2]) < 10 ? "0"+ Number(time[2]) : Number(time[2]);
	time[3] = Number(time[3]) < 10 ? "0"+ Number(time[3]) : Number(time[3]);
	time[0] = time[1] + "-" + time[2] + "-" + time[3];
	db.run("UPDATE rollcall SET `absence` = ?, `justified` = ?, `cause` = ?, `time` = ? WHERE id = ?", [
		$('#absent').is(":checked") ? 0 : $("#lag").val() < 1 ? 1 : $("#lag").val(),
		$('#justified').is(":checked") ? 0 : 1,
		$('#cause').val() ? $('#cause').val() : null,
		time[0],
		$('#rollcall_isd').val(),
		], function(err, result){
			if(err)
			{
				alert(err)
				return
			}
			$("#content").dimmer('hide');
			$("#content").dimmer('show');
		});
})
$(document).on('submit', "#rollcall-add-form", function()
{
	var _self = this;
	var time = $("#time-st").val().parseEn();
	time = time.match(/^([0-9]{4})[-\/](0?[1-9]|1[0-2])[-\/](0?[0-9]|[1-2][0-9]|3[01])$/);
	if(!time)
	{
		alert("تاریخ اشتباه است");
		return;
	}
	if(!$("#student").val())
	{
		alert("دانش آموز را انتخاب کنید");
		return;
	}
	if(!$("#unit").val())
	{
		alert("واحد درسی را انتخاب کنید");
		return;
	}
	time[2] = Number(time[2]) < 10 ? "0"+ Number(time[2]) : Number(time[2]);
	time[3] = Number(time[3]) < 10 ? "0"+ Number(time[3]) : Number(time[3]);
	time[0] = time[1] + "-" + time[2] + "-" + time[3];
	db.run(
		"INSERT INTO rollcall (`student_id`, `unit_id`, `time`, `absence`, `justified`, `cause`) VALUES (?, ?, ?, ?, ?, ?);",
		[
		$("#student").val(),
		$("#unit").val(),
		time[0],
		$('#absent').is(":checked") ? 0 : $("#lag").val() < 1 ? 1 : $("#lag").val().parseEn(),
		$('#justified').is(":checked") ? 0 : 1,
		$('#cause').val() ? $('#cause').val() : null
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
					"<td>" + ($('#absent').is(":checked") ? 'غیبت' : 'تاخیر ' + $("#lag").val() < 1 ? 1 : $("#lag").val().parseFa() + "دقیقه")  +"</td>"+
					"</tr>").appendTo($("#list tbody"));
				var first = $("#list").is('.hidden');
				if(first)
				{
					$("#list").fadeIn('fast');
				}
				$("#lag").removeAttr('disabled');
				var tSval = $("#time-st").val();
				$(_self)[0].reset();
				$('#time-st').val(tSval)
			});
});
});