'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      len: [2, 20]
    },
    lastName: {
      type: DataTypes.STRING,
      len: [2, 20]
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    phone: {
      type: DataTypes.STRING,
      len: [10, 12]
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.item);
      }
    }
  });
  return user;
};