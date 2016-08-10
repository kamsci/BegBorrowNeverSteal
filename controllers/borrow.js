var express = require('express');
var db = require('../models');
var router = express.Router();

////////////////////////////////////////

router.route('/users')
  .get(function(req, res) {
    db.user.findAll().then(function(users) {
      res.send(users);
    });
  })

// router.route('/borrow-stuff')
//   .get(function(req, res) {
//     db.item.findAll().then(function(items) {
//       res.send(items);
//     });
//   })

router.get('/borrow-stuff/:id', function(req, res) {
  console.log(req.params.id);
  db.item.findAll({
    where: {
      userId: { $not: req.params.id }
    }
  }).then(function(items) {
    res.send(items);
  });
})



module.exports = router;