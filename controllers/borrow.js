var express = require('express');
var db = require('../models');
var router = express.Router();

////////////////////////////////////////

router.route('/')
  .get(function(req, res) {
    db.user.findAll().then(function(users) {
      res.send(users);
    });
  })

module.exports = router;