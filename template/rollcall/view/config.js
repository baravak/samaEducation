const db = require("../../../backend/db.js");
window.jalaali = require("jalaali-js");
module.exports = function(o){
	return function(fn)
	{
		var rollcallDb = {
			data : [],
			maps : {
				justified : {
					"true" : [],
					"false" : []
				},
				absence : {
					"true" : [],
					"false" : []
				},
				time : {}
			}
		};
		var D = new Date();
		var gy = D.getFullYear();
		var gm = D.getMonth() + 1;
		var gd = D.getDate();

		var startJ = jalaali.toJalaali(gy, gm, gd);
		var sjy = startJ.jm < 5 ? startJ.jy-1 : startJ.jy;
		var sjm = 5;
		var sjd = 1;
		db.get("SELECT * FROM students WHERE id = " + o.property.id, function(err, student_result)
		{
			var query = "SELECT students.*, rollcall.id AS rid, rollcall.time, rollcall.absence, rollcall.Justified, rollcall.cause, units.unit_title, units.term "+
				"FROM rollcall "+
				"INNER JOIN students ON students.id = rollcall.student_id "+
				"INNER JOIN units ON units.id = rollcall.unit_id " +
				"WHERE rollcall.time > '"+ sjy + "-05-0' AND rollcall.time < '"+ (sjy+1) + "-05-0' AND students.id = " + o.property.id;
			console.log(query)
			db.all(query
				,
				function(err, list){
					console.log(list)
					rollcallDb.data = list;
					for (var i = 0; i < list.length; i++) {
						var row = list[i];
						if(!rollcallDb.maps.time[row.time])
						{
							rollcallDb.maps.time[row.time] = [];
						}
						rollcallDb.maps.time[row.time].push(i)
						if(row.justified)
						{
							rollcallDb.maps.justified.true.push(i)
						}
						else
						{
							rollcallDb.maps.justified.false.push(i)
						}

						if(row.absence == 0)
						{
							rollcallDb.maps.absence.true.push(i)
						}
						else
						{
							rollcallDb.maps.absence.false.push(i)
						}
					}
				var onList = false;
				if(o.property.absent == 'true')
				{
					onList = rollcallDb.maps.absence.true
				}
				if(o.property.unjustified == 'true')
				{
					if(onList)
					{
						onList = $(rollcallDb.maps.justified.false).filter(onList)
					}
					else
					{
						onList = rollcallDb.maps.justified.false
					}
				}
				if(onList === false)
				{
					onList = list
				}
				else
				{
					var cache_list = onList
					onList = []
					for (var i = 0; i < cache_list.length; i++) {
						onList.push(list[cache_list[i]])
					};
				}
				var theme = {
					"el": "#content",
					"data" :
					{
						student : student_result,
						rollcall : onList,
						property : o.property
					},
					'bindJS' : function()
					{

						var startG = jalaali.toGregorian(sjy, sjm, sjd);
						var startGDate = new Date(startG.gy, startG.gm - 1, startG.gd);


						var ejy = sjy +1;
						var ejm = 4;
						var ejd = 31;

						var sWDay = startGDate.getDay();
						for (var i = 0; i < sWDay; i++) {
							$(".w-list rect").eq(i).hide();
						};
						var GArray = new Array(sWDay);
						var LastTime = {y: sjy+1};
						var count = 0;
						var random = [0,0,0,0,0,0,0,0,0, 1, 0, 1, 0, 1, 2, 0, 3, 4, 5];
						var Empty = false;
						for (var i = sWDay; i < $(".w-list rect").length; i++) {
							startGDate.setTime(startGDate.getTime() + (24*60*60*1000));
							var thisJ = jalaali.toJalaali(startGDate.getFullYear(), startGDate.getMonth()+1, startGDate.getDate());
							if(LastTime.y == thisJ.jy && thisJ.jm == 5 && !Empty){
								Empty = true;
							}
							if(Empty)
							{
								$(".w-list rect").eq(i).hide();
								continue;
							}
							thisJ.jm = thisJ.jm < 10 ? `0${thisJ.jm}` : thisJ.jm
							thisJ.jd = thisJ.jd < 10 ? `0${thisJ.jd}` : thisJ.jd
							$(".w-list rect").eq(i).attr("data-time", thisJ.jy + "-" + thisJ.jm + "-" + thisJ.jd);
							var tTimeS = thisJ.jy + "-" + thisJ.jm + "-" + thisJ.jd;
							if(rollcallDb.maps.time[tTimeS])
							{
								var count = rollcallDb.maps.time[tTimeS]
								var absence = $(count).filter(rollcallDb.maps.absence.true)
								var lag = count.length - absence.length

								var unjustified = $(count).filter(rollcallDb.maps.justified.false)
								var unjustified_absence = $(unjustified).filter(rollcallDb.maps.absence.true)

								$(".w-list rect").eq(i).attr("data-record", 'true');
								$(".w-list rect").eq(i).attr("data-absence", absence.length);
								$(".w-list rect").eq(i).attr("data-lag", lag);
								$(".w-list rect").eq(i).attr("data-unjustified", unjustified.length);
								$(".w-list rect").eq(i).attr("data-unjustified-absence", unjustified_absence.length);
								if(o.property.absent == 'true' && o.property.unjustified == 'true')
								{
									$(".w-list rect").eq(i).attr("data-count", unjustified_absence.length);
								}
								else if(o.property.absent == 'true')
								{
									$(".w-list rect").eq(i).attr("data-count", absence.length);
								}
								else if(o.property.unjustified == 'true')
								{
									$(".w-list rect").eq(i).attr("data-count", unjustified.length);
								}
								else
								{
									$(".w-list rect").eq(i).attr("data-count", count.length);
								}
								$(".w-list rect").eq(i).attr("data-html", `غیبت : <b>${absence.length.parseFa()}</b><br>تاخیر: <b>${lag.parseFa()}</b><br><small>${tTimeS.parseFa()}</small>`)
							}
						};
						$("rect").popup({
							context : 'body',
							hoverable  : true,
							offset : 15,
							position   : 'bottom left',
							delay: {
								show: 0,
								hide: 0
							}
						});
						$(".popup").popup({
							context : 'body',
							hoverable  : true,
							position   : 'bottom right',
							delay: {
								show: 0,
								hide: 0
							}
						})
						$(".w-list rect[data-record]").each(function()
						{
							$(this).click(function()
							{
								console.log(this)
							})
						})
					}
				}
				fn(theme);
				$(".rollcall-filter .slider :checkbox").each(function(){
					var id = $(this).attr('id')
					if(o.property[id] == 'true')
					{
						$(this).attr('checked', 'checked')
					}
				})
				$(".rollcall-filter .slider").checkbox({
					onChecked : function()
					{
						o.property[$(this).attr("id")] = true
						set_absence(o)
					},
					onUnchecked : function()
					{
						o.property[$(this).attr("id")] = false
						set_absence(o)
					}
				})
			});
		})
}
}

function set_absence(o)
{
	var hash = o.url
	for (p in o.property)
	{
		hash += `:${p}=${o.property[p]}`
	}
	location.hash = hash
}