const sqlite3 = require('sqlite3');
const path = require('path');
const $ = require('../jquery.js');
const router = require("../../../backend/router.js");
const config = require("../../../config.json");
const fs = require('fs');

$(document).on('submit', "#select-db", function()
{
	var file_path = $("#select-db-path").val();
	if(fs.existsSync(file_path))
	{
		if(!config.sys ) config.sys = {};
		config.sys.db = file_path;
		fs.writeFileSync(path.join(__dirname, "..", "..", "..", "config.json"), JSON.stringify(config));
		router("/");
	}
	else
	{
		alert("فایل پیدا نشد");
	}
	return false;
});

$(document).on('change', "#select-db-file", function()
{
	$("#select-db-path").val(this.files[0].path);
});

$(document).on('submit', "#dir-db", function()
{
	var dir = $("#dir-db-path").val();
	var file_path = path.join(dir, 'sama.sqlite');
	var notAccess = undefined;
	try
	{
		notAccess = fs.accessSync(dir, fs.constants.W_OK);
	} catch(e)
	{
		notAccess = true;
	}
	if(notAccess)
	{
		alert("شما به این مسیر دسترسی ندارید");
	}
	else
	{
		if(!config.sys) config.sys = {};
		var db = new sqlite3.Database(file_path);
		db.exec("CREATE TABLE `rollcall` (`id` INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, `time` TEXT, `student_id` INTEGER, `unit_id` INTEGER, `absence` INTEGER, `Justified` INTEGER, `cause` TEXT); CREATE TABLE `students` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, `unique_code` INTEGER UNIQUE, `ncode` TEXT UNIQUE, `name` TEXT, `family` TEXT, `fname` TEXT);CREATE TABLE `units` (`id` INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, `unit_title` TEXT UNIQUE, `term` INTEGER);")
		config.sys.db = file_path;
		fs.writeFileSync(path.join(__dirname, "..", "..", "..", "config.json"), JSON.stringify(config));
		router("/");
	}
	return false;
});
$(document).on('change', "#dir-db-file", function()
{
	$("#dir-db-path").val(this.files[0].path);
});