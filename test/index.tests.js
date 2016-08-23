var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index.js');

/////////////////////////////////////

describe('Angular App /', function() {
  //tests for 'GET /' go here
  it('should return a 200 response', function(done) {
    request(app).get('/').expect(200, done);
  });
});

