let fs = require('fs');
let path = require('path');
let $ = require('../static/js/jquery.js');
let T_PATH = "./template";
let C_PATH = "../template";
function router(_url)
{
	var url = _url == "" || _url == "/" || undefined || null ? 'home' : _url;
	var url_array = url.split(/\//);
	var file_path = path.join(T_PATH, url, 'theme.html');
	var theme = fs.readFileSync(file_path, 'utf8');
	var config_path = path.join(C_PATH, url, 'config.js');
	$("body").attr("id", url_array.join("-"));
	var config = require(config_path);
	var options = {
		'url' : url,
		'url_array' : url_array
	};
	theme_analisor.call(options, theme, config);
}
function theme_analisor(_theme, _config)
{
	var theme = $(_theme);
	var btheme_length = 0;
	var __self = this;
	var ids = [];
	theme.each(function(element, id)
	{
		var id = $(this).attr('id');
		if(!id)
		{
			theme.remove(this);
			return;
		}
		ids.push("#" + id);
	});
	var theme_length = theme.length;
	theme.each(function(element, id)
	{
		var id = $(this).attr('id');
		var _self = this;
		$("#" + id).fadeTo('fast', 0, function()
		{
			$(this).html($(_self).html());
			btheme_length++;
			if(btheme_length - theme_length == 0)
			{
				load_config = new _config(__self)
				if(typeof load_config == 'function')
				{
					load_config(function(_sync_config){
						new Vue(_sync_config);
						if(_sync_config.bindJS)
						{
							_sync_config.bindJS();
						}
						$(ids.join(",")).fadeTo('fast', 1);
					})
				}
				else
				{
					new Vue(new _config(__self));
					if(load_config.bindJS)
					{
						load_config.bindJS();
					}
					$(ids.join(",")).fadeTo('fast', 1);
				}
			}
		});
	});
}

window.onhashchange = function()
{
	var path = location.hash.replace('#', '');
	router(path);
}
router("/");
module.exports = router;

