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
  db.item.create({
    userId: req.body.user_id,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    active: true,
    borrowed: false,
    dateBorrowed: null,
    borrowerID: null
  })
  .then(function(success) {
    res.send(success);
  }, function(err) {
    res.send(err);
  });
});

router.put('/edit-stuff', function(req, res) {
  console.log("req.body", req.body)

  // db.item.find({
  //   where: { id: req.body.id }
  // }).then(function(item) {
  //   if (req.body.borrowed) {
  //     item.update({
  //       borrowed: false,
  //       borrowerID: null,
  //       dateBorrowed: null
  //     }).then(function(data) {
  //       console.log("Edit Success", data);
  //     }, function(err) {
  //       console.log("Edit Error", err);
  //     })  
  //   } else {
  //     item.update({
  //       borrowed: true,
  //       borrowerID: null,
  //       dateBorrowed: null
  //     }).then(function(data) {
  //       console.log("Edit Success", data);
  //     }, function(err) {
  //       console.log("Edit Error", err);
  //     })  
  //   }
    
  // })
});

module.exports = router;