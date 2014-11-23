'use strict';

var jsonMask = require('json-mask');

module.exports = function (queryParam) {
  if (queryParam === undefined) queryParam = 'fields';


  function wrapper(request, jsonMethod) {
    return function (data, target) {
      if (data === undefined) data = {};
      if (target === undefined) target = undefined;


      if (queryParam in request.query) {
        var filterString = target !== undefined ? '*,' + target + '(' + request.query[queryParam] + ')' : request.query[queryParam];
        jsonMethod(jsonMask(data, filterString));
      } else jsonMethod(data);
    };
  }

  function middleware(request, response, next) {
    response.json = wrapper(request, response.json.bind(response));
    next();
  }
  return middleware;
};