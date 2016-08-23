var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index.js');
var db = require('../models');
//////////////////////////////////////

//// INSTRUCTIONS ////
// Run sequelize db:seed:all in the test database to have appropriate data for testing 
/////////////////////

describe('POST /signin - Create a user: NEW FEATURE', function(done) {
  it('should give a 200 response');
  it('should create a user if the email is unique and all fields complete');
  it('should not create a user if the email is not unique');
  it('should not create a user if a field is missing');
});

describe('GET /login - User can login: NEW FEATURE', function(done) {
  it('should give you a 200 response');
  it('should verify user exits in db, log them in and redirect to borrow page');
  it('should verify if user does not exist, they are redirected to signin');
});

describe('GET /borrow-stuff/:id - Displays items of non-currentlly-selected users only', function(done) {
  it('should give you a 200 response', function(done) {
    request(app).get('/api/borrow-stuff/' + 1).expect(200, done);
  });
  it('should return items that do not belong to the currentlly selected user(1)', function(done) {
    request(app).get('/api/borrow-stuff/' + 1)
    .end(function(err, res) {
      expect(res.body).to.have.lengthOf(7);
      for(var i = 0; i < res.body.length; i++) {
        expect(res.body[i].userId).to.not.equal(1);  
      }
      done();
    })
  });

})

describe('/new-stuff - Creating an item by user', function() {
  it('should give a 200 response - /new-stuff', function(done) {
    request(app).get("/api/new-stuff").expect(200, done);
  })
  it('should create a single item on /new-stuff', function(done) {
    request(app).post('/api/new-stuff')
      .type('form')
      .send({
        user_id: 1,
        name: 'Yarn',
        category: 'Indoor Fun',
        description: 'Rainbow yarn, medium weight, great for scarves',
        imageUrl: 'http://static1.squarespace.com/static/524de78fe4b055fcea8d1784/t/543ae028e4b039cd17f641a0/1413145514416/zauberzeug-superchunk-yarn-neon-rainbow-gradient',
        active: true,
        borrowed: false,
        dateBorrowed: null,
        borrowerID: null
      })
      .end(function(err, res) {
        console.log(res.body);
        expect(res.body).to.have.property('userId', 1);
        expect(res.body).to.have.property('name', 'Yarn');
        expect(res.body).to.have.property('category', 'Indoor Fun');
        expect(res.body).to.have.property('description', 'Rainbow yarn, medium weight, great for scarves');
        expect(res.body).to.have.property('imageUrl', 'http://static1.squarespace.com/static/524de78fe4b055fcea8d1784/t/543ae028e4b039cd17f641a0/1413145514416/zauberzeug-superchunk-yarn-neon-rainbow-gradient');
        expect(res.body).to.have.property('active', true);
        expect(res.body).to.have.property('borrowed', false);
        expect(res.body).to.have.property('dateBorrowed', null);
        expect(res.body).to.have.property('borrowerID', null);
        done();
      })
  });
});

// describe('Blobs', function() {
//   it('should list ALL blobs on /blobs GET');
//   it('should list a SINGLE blob on /blob/<id> GET');
//   it('should add a SINGLE blob on /blobs POST');
//   it('should update a SINGLE blob on /blob/<id> PUT');
//   it('should delete a SINGLE blob on /blob/<id> DELETE');
// });

// request(app).post("/tacos")
//       .type("form")
//       .send({
//         name: "Cheesy Gordita Crunch",
//         amount: 3
//       })
//       .expect("location", "/tacos")
//       .expect(302, done);
//   });