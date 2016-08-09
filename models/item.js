'use strict';
module.exports = function(sequelize, DataTypes) {
  var item = sequelize.define('item', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    borrowed: DataTypes.BOOLEAN,
    borrowerID: DataTypes.INTEGER,
    dateBorrowed: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return item;
};