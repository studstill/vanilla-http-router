# vanilla-http-router

Simple routing for Node.js HTTP server

## Installation

```sh
$ npm install http-router
```

## Usage

```js
var http = require('http'),
    Router = require('vanilla-http-router'),
    appRouter = new Router();

appRouter
  .get('/', function(req, res) {
    res.write('Got a GET request to /');
    res.end();
  });

appRouter
  .post('/', function(req, res, next) {
    res.write('Got a POST request to /');
    res.end();
  });

appRouter
  .put('/user', function(req, res, next) {
    res.write('Got a PUT request to /user');
    res.end();
  });

appRouter
  .delete('/user', function(req, res, next) {
    res.write('Got a DELTE request to /user');
    res.end();
  });

http.createServer(
  testRouter.route())
  .listen(3000, function() { console.log('Server started on port 3000'); })
);
```

```sh
$ curl -X GET http://localhost:3000
Got a GET request to /
$ curl -X POST http://localhost:3000
Got a POST request to /
$ curl -X PUT http://localhost:3000/user
Got a PUT request to /user
$ curl -X DELETE http://localhost:3000/unknown
Got a DELTE request to /user
```

## Test

```sh
$ npm install
$ npm test
```
