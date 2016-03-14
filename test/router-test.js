'use strict'

var chai = require('chai');
var expect = require('chai').expect;
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var request = chai.request;
var Router = require('../index.js');
var testRouter = new Router();

// Instantiate a server using the testRouter, to which we can add routes
// before the tests
(function() {
  var http = require('http')
  http.createServer(testRouter.route()).listen(3000);
})();


describe('testRouter', function() {
  // Mock database
  var db = {};

  // Set route handlers in Before block, which was moved to the
  // bottom for better readability

  it('should handle GET routes', function(done) {
    request('http://localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      })
  })

  it('should handle POST routes', function(done) {
    request('http://localhost:3000')
      .post('/')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should handle PUT routes', function(done) {

  });

  it('should handle PATCH routes', function(done) {

  });

  it('should handle DELETE routes', function(done) {

  });

  it('should return an error on bad route', function(done) {
    try {
      // Handle bad route
      testRouter.fizzlePop('/', function(req, res) {
        res.end()
      });
    } catch(err) {
      console.log(err);
    }


  })

  // Declare route handlers
  before(function() {
   var supportedRestVerbs = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

    // Handle GET to root url
    testRouter.get('/', function(req, res) {
      console.log('/ root route hit')
      res.writeHead(200, {'content-type': 'text/html'});
      res.write('gotcha');
      res.end()
    });

  })
})
