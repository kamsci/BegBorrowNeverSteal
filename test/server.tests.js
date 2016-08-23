var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index.js');
var db = require('../models');
//////////////////////////////////////

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('Creating an item via /new-stuff', function() {
  it('should give a 200 response - /new-stuff', function(done) {
    request(app).get("/").expect(200, done);
  })
  it('should create a single item on /new-stuff', function(done) {
    request(app).post('/api/new-stuff')
      .type('form')
      .send({
        userId: 1,
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
        console.log(res)
        // expect(res.body).to.have.property('userId', 1);
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