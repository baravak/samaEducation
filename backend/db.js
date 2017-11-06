const sqlite3 = require('sqlite3');
const config = require("../config.json");
if(config.sys && config.sys.db)
{
	module.exports = new sqlite3.Database(config.sys.db);
}