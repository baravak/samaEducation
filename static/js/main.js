require('./backend/index.js');
require('./static/js/template/home.js');
require('./static/js/template/students/add.js');
require('./static/js/template/rollcall/add.js');
require('./static/js/template/unit/add.js');

var FaNum = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

Number.prototype.parseFa = function()
{
	return this.toString().replace(/\d/g, function(f){
		return FaNum[f]
	});
}

$("#print-page").click(function()
{
	print();
});

String.prototype.parseFa = function()
{
	return this.toString().replace(/\d/g, function(f){
		return FaNum[f]
	});
}
$(document).on('submit', "form", function()
{
	return false;
});
