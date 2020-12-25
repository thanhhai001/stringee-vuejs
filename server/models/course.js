'use strict';
module.exports = (sequelize, DataTypes) => {
  var Course = sequelize.define('courses', {
    topicId: DataTypes.INTEGER,
    courseTypeId: DataTypes.INTEGER,
    levelId: DataTypes.INTEGER,
    courseName: DataTypes.STRING,
    courseDescription: DataTypes.STRING,
    costs: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    image: DataTypes.STRING,
    URL: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});

  return Course;
};
