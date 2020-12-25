'use strict';
module.exports = (sequelize, DataTypes) => {
  var teacherComment = sequelize.define('teacherComments', {
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  return teacherComment;
};
