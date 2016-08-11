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

router.get('/borrow-stuff/:id', function(req, res) {
  console.log(req.params.id);
  db.item.findAll({
    where: {
      userId: { $not: req.params.id }
    },
    include: [db.user, {
      model: db.user,
      as: 'borrower'
    }]
  }).then(function(items) {
      db.item.findAll({
        // where: {
        //   borrowed: true
        // }
        include: [{
          model: db.user,
          where: { 
            id: db.item.borrowerID }
        }]
      }).then(function(bUsers) {
        console.log("bUsers", bUsers);
        res.json({items: items, bUsers: bUsers});
      })
    });
});

router.get('/lend-stuff/:id', function(req, res) {
  console.log(req.params.id);
  db.item.findAll({
    where: {
      userId: req.params.id
    },
    include: [db.user]
    // {
    //   model: db.user,
    //   where: { 
    //     id: db.item.borrowerID }
    // }]
  }).then(function(myItems) {
    res.json({myItems: myItems});
  })
});

router.post('/new-stuff', function(req, res) {
  console.log('FORM:', req.body);
})

module.exports = router;