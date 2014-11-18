var express = require('express'),
	expressJsonMask = require('express-json-mask'),
	app = express();


var json = {
	name: 'Express',
	version: 'version',
	description: 'description',
	repository: {
		type: 'git',
		url: 'url'
	}
};

app.use(expressJsonMask(/*[optional] query parameter to use (defaults to fields)*/));
// example: app.use(expressJsonMask('field'));

app.get('/', function(request, response) {

	response.status(200).json(json/*, [optional] filtering target*/);
	// example: xxx.json(json, 'repository');
});

app.listen(1337);


