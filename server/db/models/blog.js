'use strict';
module.exports = (sequelize, DataTypes) => {

  var Blog = sequelize.define('Blog', {

    authorId: { type: DataTypes.INTEGER, allowNull: true },
    title: { type: DataTypes.STRING, allowNull: false },
    article: { type: DataTypes.TEXT, allowNull: false },
    featured: { type: DataTypes.BOOLEAN, allowNull: false },
    published: { type: DataTypes.DATE, allowNull: true }
  });
  Blog.associate = function(models) {
    // associations can be defined here
    Blog.belongsTo(models.Author);
  };
  return Blog;
};