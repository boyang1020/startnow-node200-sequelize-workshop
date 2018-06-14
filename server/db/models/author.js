'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
    firstName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true }
});

  Author.associate = function(models) {
    // associations can be defined here

   Author.hasMany(models.Blog, {as:"blogs"});
  };
  return Author;}