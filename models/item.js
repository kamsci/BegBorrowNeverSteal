'use strict';
module.exports = function(sequelize, DataTypes) {
  var item = sequelize.define('item', {
    userId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      len: [2, 20],
      notEmpty: true
    },
    category: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    description: { 
      type: DataTypes.TEXT,
      len: [5, 300]
    },
    imageUrl: {
      type: DataTypes.STRING,
      isUrl: true
    },
    active: DataTypes.BOOLEAN,
    borrowed: DataTypes.BOOLEAN,
    borrowerID: DataTypes.INTEGER,
    dateBorrowed: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.item.belongsTo(models.user);
      }
    }
  });
  return item;
};