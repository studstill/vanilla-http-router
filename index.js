/*************************************************
* vanilla-http-router Copyright(c) 2016 studstill
* https://github.com/studstill/vanilla-http-router
* Released under the MIT License.
*************************************************/

'use strict';
var http = require('http');

// export Router constructor
var Router = module.exports = function() {
  this.routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'PATCH': {},
    'DELETE': {}
  };
};

Router.prototype.get = function(route, cb) {
  this.routes.GET[route] = cb;
};

Router.prototype.post = function(route, cb) {
  this.routes.POST[route] = cb;
};

Router.prototype.put = function(route, cb) {
  this.routes.PUT[route] = cb;
};

Router.prototype.patch = function(route, cb) {
  this.routes.PATCH[route] = cb;
};

Router.prototype.delete = function(route, cb) {
  this.routes.DELETE[route] = cb;
};

Router.prototype.route = function() {
  return function(req, res) {
    try {
      var routeFunction = this.routes[req.method][req.url];
      routeFunction(req, res);
    } catch(err) {
      throw req.method + ' is not a valid REST verb'
    }
  }.bind(this);
};
