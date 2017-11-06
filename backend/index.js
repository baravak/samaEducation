const http = require('http');
require('./router.js');
require('./db.js');

http.createServer(function (req, res) {
	res.write('Hello World!');
	res.end();
}).listen(28080);