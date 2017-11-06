const fs = require('fs');
const machine_id = require("node-machine-id");
if(!fs.existsSync("./config.json"))
{
	fs.writeFileSync("./config.json", '{"ID": "'+machine_id.machineIdSync()+'"}');
}
else
{
	var changed = false;
	const config = require("./config.json");
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
		fs.writeFileSync("./config.json", JSON.stringify(config));
	}
}

const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win;
function createWindow () {
	win = new BrowserWindow({
		width: 1000,
		height: 800,
		icon: path.join(__dirname, 'static/images/logo.png'),
		backgroundColor: '#312450',
		center : true,
		title : "Sama",
		// fullscreen : true,
	});

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))

	win.webContents.openDevTools()

	win.on('closed', () => {
		win = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})
