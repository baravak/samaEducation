require('./backend/index.js');
require('./static/js/template/home.js');
require('./static/js/template/students/add.js');
require('./static/js/template/rollcall/add.js');
require('./static/js/template/unit/add.js');

var FaNum = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

Number.prototype.parseFa = String.prototype.parseFa = function()
{
	return this.toString().replace(/\d/g, function(f){
		return FaNum[f]
	});
}
String.prototype.parseEn = function()
{
	return this.toString().replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(f){
		return FaNum.indexOf(f)
	});
}
String.prototype.parseDate = function()
{
	return this.toString().replace(/[-]/g, function(f){
		return "/"
	});
}

$("#print-page").click(function()
{
	print();
});

$(document).on('submit', "form", function()
{
	return false;
});
