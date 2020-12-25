'use strict';
module.exports = (sequelize, DataTypes) => {
  var userCourse = sequelize.define('userCourses', {
    courseId: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    registDate: DataTypes.DATE,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    data: {
      type: sequelize.JSON,
    },
  });
//   userCourse.associate = function(models) {
//     userCourse.belongsTo(models.courses, {
//         foreignKey: 'courseId',
//         targetKey: 'courseId',
//         as: 'course'
//     });
// };
userCourse.associate = function(models) {
  userCourse.belongsTo(models.courses, {
      foreignKey: 'courseId',
      targetKey: 'id',
  });
};
  return userCourse;
};
