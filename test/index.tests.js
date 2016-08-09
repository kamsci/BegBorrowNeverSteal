var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index.js');
var db = require('../models');

/////////////////////////////////////

// before(function(done) {
//   db.sequelize.sync({ force: true }).then(function() {
//     done();
//   });
// });

describe('Angular App /', function() {
  //tests for 'GET /' go here
  it('should return a 200 response', function(done) {
    request(app).get('/').expect(200, done);
  });
});

describe('Creating a user', function() {
  it('should create a user successfully', function(done) {
    db.user.create({
      firstName:"Amy",
      lastName:"Hirtzville", 
      email:"amy@gmail.com",
      phone:"255-333-4567"
    }).then(function(user) {
      done();
    }).catch(function(user) {
      done(error)
    })
  });
});

