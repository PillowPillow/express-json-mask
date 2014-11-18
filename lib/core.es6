var jsonMask = require('json-mask');

module.exports = function(queryParam = 'fields') {

	function wrapper(request, jsonMethod) {
		return function(data = {}, target = undefined) {

			if(queryParam in request.query) {
				let filterString = target !== undefined ? '*,' + target + '(' + request.query[queryParam] + ')' : request.query[queryParam];
				jsonMethod(jsonMask(data, filterString));
			}
			else 
				jsonMethod(data);
		};
	}

	function middleware(request, response, next) {
		response.json = wrapper(request, response.json.bind(response));
		next();
	}
	return middleware;
};