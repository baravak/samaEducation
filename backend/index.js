const http = require('http');
const path = require('path');
const fs = require('fs');
const machine_id = require("node-machine-id");
var config_file = path.join(__dirname, "..", "config.json");
if(!fs.existsSync(config_file))
{
	fs.writeFileSync(config_file, '{"ID": "'+machine_id.machineIdSync()+'"}');
}
else
{
	var changed = false;
	const config = require(config_file);
	if(config.sys && config.sys.db)
	{
		if(!fs.existsSync(config.sys.db))
		{
			changed = true;
			config.sys.db = null;
		}
	}
	if(config.ID != machine_id.machineIdSync())
	{
		changed = true;
		config.ID = machine_id.machineIdSync();
		if(config.sys)
		{
			delete config.sys;
		}
	}
	if(changed)
	{
		fs.writeFileSync(config_file, JSON.stringify(config));
	}
}

const router = require('./router.js');
router.go("/");
require('./db.js');