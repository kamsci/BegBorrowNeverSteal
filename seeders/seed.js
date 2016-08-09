var db = require('../models');

db.user.create({
    firstName:"Amy",
    lastName:"Hirtzville", 
    email:"amy@gmail.com",
    phone:"255-333-4567"
}).then(function(user) {
  console.log(user)
  done();
}).catch(function(error) {
  done(error);
});