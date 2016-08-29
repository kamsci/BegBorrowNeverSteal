var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index.js');
var db = require('../models');
var i = null;

//////////////////////////////////////

//// TESTING INSTRUCTIONS ////
// Run command 'sequelize --env test db:migrate' to create db in test
// Run sequelize command 'sequelize --env test db:seed:all'
// NOTE: run in test database ONLY ONCE to have appropriate data for testing 
// Tun tests with command 'npm test' in terminal

////////////////////////////////////

describe('POST /signin - Create a user: NEW FEATURE', function() {
  it('should give a 200 response');
  it('should create a user if the email is unique and all fields complete');
  it('should not create a user if the email is not unique');
  it('should not create a user if a field is missing');
  it('should take new user to borrow page');
});

describe('GET /login - User can login: NEW FEATURE', function() {
  it('should give you a 200 response');
  it('should verify user exits in db, log them in and redirect to borrow page');
  it('should verify if user does not exist, they are redirected to signin');
});

describe('GET /api/filter-available: NEW FEATURE', function() {
  it('should give you a 200 response');
  it('should only return items with "borrowed"="false" when "Available only" checkbox checked');
});

describe('GET /api/filter-catagory: NEW FEATURE', function() {
  it('should give you a 200 response');
  it('should only return items by category when category chosen from "Category"');
});

describe('GET /borrow-stuff/:id - Displays items of non-currently-selected users only', function() {
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
});

describe('GET /borrowed-stuff/:id - Displays items borrowed by currently-selected user', function() {
  it('should give you a 200 response', function(done) {
    request(app).get('/api/borrowed-stuff/' + 1).expect(200, done);
  })
  it('should return items with "borrowed"= "true" && "borrowerID"= 1', function(done) {
    request(app).get('/api/borrowed-stuff/' + 1)
      .type('form')
      .send({
        borrowerID: 1
      })
      .end(function(err, res) {
        console.log(res.body);
        for(var i = 0; i < res.body.length; i++) {
          expect(res.body[i].borrowed).to.equal(true);
          expect(res.body[i].borrowerID).to.equal(1);
          expect(res.body[i].borrower.firstName).to.equal('Amy'); 
        }
        done();
      })
  });
});

describe('GET POST /new-stuff - Creating an item by user', function() {
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
        i = res.body.id
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

describe(' GET /edit-stuff/ & POST /get-edit/:id - Edit an item', function() {
  it('should give a 200 response - /get-edit/:id', function(done) {
    request(app).get('/api/get-edit/:id').expect(200, done);
  })
  it('should return current info on item', function(done) {
    request(app).get('/api/get-edit/' + i)
      .end(function(err, res) {
        expect(res.body).to.have.property('userId', 1);
        expect(res.body).to.have.property('name', 'Yarn');
        expect(res.body).to.have.property('category', 'Indoor Fun');
        expect(res.body).to.have.property('description', 'Rainbow yarn, medium weight, great for scarves');
        expect(res.body).to.have.property('imageUrl', 'http://static1.squarespace.com/static/524de78fe4b055fcea8d1784/t/543ae028e4b039cd17f641a0/1413145514416/zauberzeug-superchunk-yarn-neon-rainbow-gradient');
        done();
      })
  })
  it('should give a 200 response - /edit-stuff/', function(done) {
    request(app).get('/api/edit-stuff/').expect(200, done);
  })
  it('should update an item with new info', function(done) {
    request(app).put('/api/edit-stuff/')
      .type('form')
      .send({
        id: i,
        name: 'Pocket Sand',
        category: 'Tools',
        description: 'For defense.',
        imageUrl: 'http://www.csg.space/wp-content/uploads/2015/12/Sand.jpg'
      })
      .end(function(err, res) {
        expect(res.body).to.have.property('id', i);
        expect(res.body).to.have.property('name', 'Pocket Sand');
        expect(res.body).to.have.property('category', 'Tools');
        expect(res.body).to.have.property('description', 'For defense');
        expect(res.body).to.have.property('imageUrl', 'http://www.csg.space/wp-content/uploads/2015/12/Sand.jpg');
      })
      done(); 
  });
});

describe('/delete-stuff - Delete an item', function() {
  it('should give a 200 response - /delete-stuff', function(done) {
    request(app).get('/api/delete-stuff').expect(200, done);
  })
  it('should delete an item from the db', function(done) {
    request(app).put('/api/delete-stuff')
    .type('form')
    .send({
      id: i
    })
    .end(function(err, res) {
      // console.log("Err", err, "res", res);
      if (err) {
        console.log(err);
      } else {
        console.log("Res:", res.body);
      }
      done();
    })
  })
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