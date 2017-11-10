const db = require("../../../backend/db.js");
module.exports = function(o){
	return {
		"el": "#content",
		"data" :
		{
		},
		"bindJS" : function()
		{
			$('#find-user.dropdown').dropdown({
				fields: { name: "description", value: "unique_code" },
				apiSettings: {
					mockResponseAsync: function(o, f)
					{
						var search = '%' + $('.search', this).val() + '%';
						db.all("SELECT * FROM students WHERE name LIKE ?1 OR family LIKE ?1 OR unique_code LIKE ?1 LIMIT 10", [search], function(e, row)
						{
							results = [];
							for (var i = 0; i < row.length; i++) {
								results.push({
									description : row[i].name + " " + row[i].family + " " + row[i].unique_code,
									unique_code : row[i].id,
								});
							};
							f({"results" : results});
						});
					}
				}
			});
			$('#find-unit.dropdown').dropdown({
				fields: { name: "description", value: "id" },
				apiSettings: {
					mockResponseAsync: function(o, f)
					{
						var search = '%' + $('.search', this).val() + '%';
						db.all("SELECT * FROM units WHERE unit_title LIKE ?1 LIMIT 10", [search], function(e, row)
						{
							results = [];
							for (var i = 0; i < row.length; i++) {
								results.push({
									description : row[i].unit_title + " | ترم " + row[i].term,
									id : row[i].id,
								});
							};
							f({"results" : results});
						});
					}
				}
			});
			$('#time-st').persianDatepicker({
				observer: true,
				format: 'YYYY/MM/DD',
				altField : "#time",
				altFormat : "YYYY-MM-DD",
				persian : false,
				calendar : {
					persian : {
						locale : 'en'
					}
				}
			});
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
}