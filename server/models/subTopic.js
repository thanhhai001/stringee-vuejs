'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubTopic = sequelize.define('subTopics', {
    subTitle: DataTypes.STRING,
    subNo: DataTypes.INTEGER,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  return SubTopic;
};
