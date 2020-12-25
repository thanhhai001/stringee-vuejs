'use strict';
module.exports = (sequelize, DataTypes) => {
  var QA = sequelize.define('qas', {
    question: DataTypes.STRING,
    answer: DataTypes.INTEGER,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  return QA;
};
