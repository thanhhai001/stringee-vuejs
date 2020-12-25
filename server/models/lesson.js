'use strict';
module.exports = (sequelize, DataTypes) => {
  var Lesson = sequelize.define('lessons', {
    lessonTitle: DataTypes.STRING,
    lessonNo: DataTypes.INTEGER,
    contents: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  return Lesson;
};
