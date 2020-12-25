'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('topics', {
    title: DataTypes.INTEGER,
    sectionNumber: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  return Topic;
};
