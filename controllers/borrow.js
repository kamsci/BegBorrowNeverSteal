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
    },
    include: [db.user]
  }).then(function(items) {
      db.user.findAll({
        // where: {
        //   borrowed: true
        // }
        include: [{
          model: db.item,
          where: { 
            borrowed: true,
            borrowerID: db.user.id }
        }]
      }).then(function(bUsers) {
        // console.log("bUsers", bUsers);
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

// Project.findAll({
//     include: [{
//         model: Task,
//         where: { state: Sequelize.col('project.state') }
//     }]
// })

module.exports = router;