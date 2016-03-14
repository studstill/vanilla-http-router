'use strict'

var chai = require('chai');
var expect = require('chai').expect;
var chaiHTTP = require('chai-http');
    chai.use(chaiHTTP);
var request = chai.request;
var http = require('http')
var Router = require('../index.js');
var testRouter = new Router();

var supportedHTTPVerbs = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
var chaiHTTPMethods = {
  'GET': 'get',
  'POST': 'post',
  'PUT': 'put',
  'PATCH': 'patch',
  'DELETE': 'del'
};

describe('testRouter', function() {

  before(function() {
    // Instantiate a server using the testRouter, to which we can add routes
    (function() {http.createServer(testRouter.route()).listen(3000);})();
   // Dynamically declare route handlers
    supportedHTTPVerbs.forEach(function(HTTPVerb) {
      testRouter[HTTPVerb.toLowerCase()]('/', function(req, res) {
        console.log(HTTPVerb + ' to / root route hit')
        res.writeHead(200, {'content-type': 'text/html'});
        res.write('gotcha');
        res.end()
      });
    });
  });

  // Dynamically create and run tests
  supportedHTTPVerbs.forEach(function(HTTPVerb) {
    it('should handle ' + HTTPVerb + ' routes', function(done) {
      request('http://localhost:3000')
        [chaiHTTPMethods[HTTPVerb]]('/')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    })
  })
});
