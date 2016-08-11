var express = require('express');
var db = require('../models');
var router = express.Router();

////////////////////////////////////////

router.get('/users', function(req, res) {
  db.user.findAll().then(function(users) {
    res.send(users);
  });
});

router.get('/borrow-stuff/:id', function(req, res) {
  console.log("Borrow", req.params.id);
  db.item.findAll({
    where: {
      userId: { $not: req.params.id }
    },
    include: [db.user, {
      model: db.user,
      as: 'borrower'
    }]
  }).then(function(items) {
      res.send(items);
    });
});

router.get('/lend-stuff/:id', function(req, res) {
  console.log("Params", req.params.id);
  db.item.findAll({
    where: {
      userId: req.params.id
    },
    include: [db.user, {
      model: db.user,
      as: 'borrower'
    }]
  }).then(function(myItems) {
    res.send(myItems);
  })
});

router.get('/borrowed-stuff/:id', function(req, res) {
  db.item.findAll({
    where: {
      borrowerID: req.params.id 
    },
    include: [db.user, {
      model: db.user,
      as: 'borrower'
    }]
  }).then(function(myBorrowedItems) {
    res.send(myBorrowedItems);
  });
});

router.post('/new-stuff', function(req, res) {
  console.log('FORM:', req.body);
})

module.exports = router;