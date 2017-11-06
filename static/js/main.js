const $ = require('./static/js/jquery.js');
require('./backend/index.js');
require('./static/js/template/home.js');
require('./static/js/template/students/add.js');
require('./static/js/template/callrole/add.js');
require('./static/js/template/unit/add.js');
$(document).on('submit', "form", function()
{
	return false;
});
