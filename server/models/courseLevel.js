'use strict';
module.exports = (sequelize, DataTypes) => {
  var CourseLevel = sequelize.define('courseLevels', {
    courseId: DataTypes.INTEGER,
    levelName: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  return CourseLevel;
};
